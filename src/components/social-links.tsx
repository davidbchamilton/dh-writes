const profiles = [
  { label: "Instagram", href: "https://www.instagram.com/davidhamiltonwrites/" },
  { label: "TikTok", href: "https://www.tiktok.com/@davidhamiltonwrites" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61595822534453",
  },
];

export function SocialLinks() {
  return (
    <ul className="flex flex-wrap gap-x-5" aria-label="David Hamilton on social media">
      {profiles.map(({ label, href }) => (
        <li key={label}>
          <a className="inline-flex min-h-11 items-center" href={href} data-analytics="contact">
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
