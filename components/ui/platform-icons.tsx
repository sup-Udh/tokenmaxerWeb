import * as React from "react";

/**
 * Simplified, monochrome OS marks for the installation docs. Drawn inline
 * (currentColor) so they inherit text color/opacity, matching harness-icons.tsx.
 */

type IconProps = React.SVGProps<SVGSVGElement>;

const base: Partial<IconProps> = {
  viewBox: "0 0 32 32",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

/** Apple — macOS */
export function AppleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M21.5 11.2c-1.9-.1-3.4 1.1-4.3 1.1-.9 0-2.2-1.1-3.7-1-1.9 0-3.6 1.1-4.6 2.8-2 3.4-.5 8.5 1.4 11.3.9 1.4 2 2.9 3.5 2.8 1.4-.1 1.9-.9 3.6-.9s2.1.9 3.6.9c1.5 0 2.5-1.4 3.4-2.8.6-.9 1.1-2 1.5-3-1.9-.7-3.2-2.5-3.2-4.6 0-1.9 1-3.5 2.5-4.4-.9-1.3-2.3-2.1-3.7-2.2Z"
        fill="currentColor"
      />
      <path
        d="M17.9 8.9c.7-.9 1.2-2.1 1.1-3.4-1.1.1-2.4.7-3.1 1.6-.7.8-1.3 2-1.1 3.3 1.2.1 2.4-.6 3.1-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Windows — four-pane flag */
export function WindowsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="11" height="11" rx="1" fill="currentColor" />
      <rect x="17" y="4" width="11" height="11" rx="1" fill="currentColor" />
      <rect x="4" y="17" width="11" height="11" rx="1" fill="currentColor" />
      <rect x="17" y="17" width="11" height="11" rx="1" fill="currentColor" />
    </svg>
  );
}

/** Linux — Tux silhouette */
export function LinuxIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="16" cy="9" r="5.5" fill="currentColor" />
      <path
        d="M8.5 15 C8.5 11.5, 11.5 9, 16 9 C20.5 9, 23.5 11.5, 23.5 15 C23.5 20, 22 26, 16 26 C10 26, 8.5 20, 8.5 15 Z"
        fill="currentColor"
      />
      <path d="M12.5 20 C14 21.5, 18 21.5, 19.5 20 C18.5 23, 13.5 23, 12.5 20 Z" fill="currentColor" opacity="0.35" />
      <circle cx="13" cy="9.5" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="19" cy="9.5" r="1" fill="currentColor" opacity="0.4" />
      <path d="M9 22 L7 27 M23 22 L25 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
