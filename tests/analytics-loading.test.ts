import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import * as analytics from "../src/lib/analytics";

// Exercise the effect without downloading Google scripts or sending events.
const code = ts.transpileModule(
  readFileSync(new URL("../src/components/google-analytics.tsx", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;

function mount(hostname = "davidhamiltonwrites.com", readyState = "loading", idle = true) {
  const listeners = new Map<string, (event?: unknown) => void>();
  const scripts: { id?: string; src?: string }[] = [];
  const callbacks = new Map<number, () => void>();
  let cleanup: (() => void) | undefined;
  let nextId = 0;
  const schedule = (callback: () => void) => {
    callbacks.set(++nextId, callback);
    return nextId;
  };
  const target = {
    addEventListener: (name: string, callback: () => void) => listeners.set(name, callback),
    removeEventListener: (name: string) => listeners.delete(name),
  };
  const window = {
    ...target,
    location: { hostname, href: `https://${hostname}/`, pathname: "/" },
    dataLayer: [] as unknown[],
    ...(idle ? { requestIdleCallback: schedule, cancelIdleCallback: (id: number) => callbacks.delete(id) } : {}),
  };
  class Element {
    href = `https://${hostname}/books/bois`;
    dataset = {};
    closest() { return this; }
  }
  const context = vm.createContext({
    exports: {}, window, Element,
    document: {
      ...target, readyState,
      getElementById: (id: string) => scripts.find((script) => script.id === id),
      createElement: () => ({}),
      head: { appendChild: (script: { id?: string; src?: string }) => scripts.push(script) },
    },
    setTimeout: schedule,
    clearTimeout: (id: number) => callbacks.delete(id),
    require: (name: string) => name === "react"
      ? { useEffect: (effect: () => (() => void) | undefined) => { cleanup = effect(); } }
      : analytics,
  });
  vm.runInContext(code, context);
  vm.runInContext("exports.GoogleAnalytics()", context);
  return { listeners, scripts, callbacks, window, cleanup: () => cleanup?.(), click: () => listeners.get("click")?.({ target: new Element() }) };
}

test("analytics queues config but waits for load and idle before fetching the tag", () => {
  const app = mount();
  assert.equal(app.window.dataLayer.length, 2);
  assert.equal(app.scripts.length, 0);
  app.listeners.get("load")?.();
  assert.equal(app.scripts.length, 0);
  app.callbacks.values().next().value?.();
  assert.equal(app.scripts.length, 1);
  assert.match(app.scripts[0].src!, /gtag\/js\?id=G-/);
  app.click();
  assert.equal(app.scripts.length, 1);
  assert.equal(app.window.dataLayer.length, 3);
});

test("a tracked click loads analytics immediately and retains the queued event", () => {
  const app = mount();
  app.click();
  assert.equal(app.scripts.length, 1);
  assert.equal(app.window.dataLayer.length, 3);
});

test("already-loaded pages and browsers without idle callbacks schedule the tag", () => {
  for (const idle of [true, false]) {
    const app = mount("davidhamiltonwrites.com", "complete", idle);
    assert.equal(app.callbacks.size, 1);
    app.callbacks.values().next().value?.();
    assert.equal(app.scripts.length, 1);
  }
});

test("unmount cancels scheduled work and preview hosts never initialize analytics", () => {
  const app = mount("davidhamiltonwrites.com", "complete");
  app.cleanup();
  assert.equal(app.callbacks.size, 0);
  assert.equal(app.listeners.size, 0);
  const preview = mount("localhost");
  assert.equal(preview.window.dataLayer.length, 0);
  assert.equal(preview.listeners.size, 0);
});
