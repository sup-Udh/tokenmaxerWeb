import * as React from "react";

/**
 * Simplified, monochrome marks for the AI coding harnesses CodeBroker
 * plugs into. Drawn inline (currentColor) so they inherit hover states
 * and never depend on external assets.
 */

type IconProps = React.SVGProps<SVGSVGElement>;

const base: Partial<IconProps> = {
  viewBox: "0 0 32 32",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

/** Claude Code — radiant starburst */
export function ClaudeCodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x="14.75"
          y="3"
          width="2.5"
          height="9"
          rx="1.25"
          fill="currentColor"
          transform={`rotate(${i * 30} 16 16)`}
        />
      ))}
    </svg>
  );
}

/** Cursor — angular pointer prism */
export function CursorIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M16 3 L27.5 9.5 V22.5 L16 29 L4.5 22.5 V9.5 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M4.5 9.5 L16 16 L27.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 16 V29" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 16 L27.5 22.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.45" />
    </svg>
  );
}

/** Antigravity — mass escaping an orbit line */
export function AntigravityIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="16" cy="12.5" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M3.5 23.5 C8 19.5, 12 18, 16 18 C20 18, 24 19.5, 28.5 23.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M16 9.5 V15.5 M13.4 12 L16 9.4 L18.6 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Windsurf — layered wave sail */
export function WindsurfIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 8.5 C13 8.5, 20 8.5, 26.5 5 L24.5 10.5 C18.5 12.5, 12 12, 6 8.5 Z" fill="currentColor" />
      <path d="M8 15.5 C14 15.5, 19.5 15, 24 12.5 L22 18 C17 19.8, 12.5 19, 8 15.5 Z" fill="currentColor" opacity="0.75" />
      <path d="M10 22.5 C14.5 22.5, 18.5 22, 21.5 20 L19.5 25.5 C16.5 26.8, 13.5 26, 10 22.5 Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/** GitHub Copilot — aviator goggles */
export function CopilotIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M4 14 C4 8, 9 5.5, 16 5.5 C23 5.5, 28 8, 28 14 V19 C28 20.5, 27.5 21.5, 26 22.5 L20.5 25.8 C19 26.7, 17.5 27, 16 27 C14.5 27, 13 26.7, 11.5 25.8 L6 22.5 C4.5 21.5, 4 20.5, 4 19 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="8" y="12.5" width="6.5" height="7" rx="2.5" fill="currentColor" />
      <rect x="17.5" y="12.5" width="6.5" height="7" rx="2.5" fill="currentColor" />
    </svg>
  );
}

/** Gemini CLI — four-point sparkle */
export function GeminiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M16 3 C16.8 10.2, 21.8 15.2, 29 16 C21.8 16.8, 16.8 21.8, 16 29 C15.2 21.8, 10.2 16.8, 3 16 C10.2 15.2, 15.2 10.2, 16 3 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** OpenAI Codex — interlaced hex knot */
export function CodexIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={i}
          d="M16 4.5 C20.5 4.5, 23.5 7.5, 23.5 11.5 L23.5 16"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          transform={`rotate(${i * 60} 16 16)`}
        />
      ))}
    </svg>
  );
}

/** Zed — bolt-cut Z */
export function ZedIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M7 7 H25 L12.5 20 H20 V16.5 H25 V25 H7 L19.5 12 H12 V15.5 H7 Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export interface Harness {
  name: string;
  tagline: string;
  Icon: (props: IconProps) => React.ReactElement;
}

export const harnesses: Harness[] = [
  { name: "Claude Code", tagline: "MCP native", Icon: ClaudeCodeIcon },
  { name: "Cursor", tagline: "MCP native", Icon: CursorIcon },
  { name: "Antigravity", tagline: "MCP native", Icon: AntigravityIcon },
  { name: "Windsurf", tagline: "MCP native", Icon: WindsurfIcon },
  { name: "GitHub Copilot", tagline: "via MCP", Icon: CopilotIcon },
  { name: "Gemini CLI", tagline: "MCP native", Icon: GeminiIcon },
  { name: "Codex", tagline: "via MCP", Icon: CodexIcon },
  { name: "Zed", tagline: "via MCP", Icon: ZedIcon },
];
