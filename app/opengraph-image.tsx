import { ImageResponse } from "next/og";

export const alt = "CodeBroker — The agent that lives in your codebase";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#060505",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(255,90,31,0.22), transparent 55%), radial-gradient(circle at 85% 85%, rgba(255,90,31,0.12), transparent 50%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.03)",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#ff5a1f",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 76,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          CodeBroker
          <span style={{ color: "#ff5a1f" }}>.</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "rgba(255,255,255,0.55)",
            marginTop: 20,
            maxWidth: 900,
          }}
        >
          The agent that lives in your codebase
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(255,255,255,0.35)",
            marginTop: 24,
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          An MCP server that indexes your repo and hands AI coding tools the
          exact files and context they need.
        </div>
      </div>
    ),
    { ...size },
  );
}
