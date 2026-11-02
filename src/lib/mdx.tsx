import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

// Evaluate only author-controlled local files. Never pass visitor input or remote MDX.
// Prepared for Phase 2; no sample article is exposed in Phase 1.
export async function compileLocalMdx(source: string) {
  const compiled = await evaluate(source, { ...runtime, development: false });
  return compiled.default;
}
