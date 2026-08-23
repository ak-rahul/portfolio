import { ImageResponse } from "next/og";

export const alt = "AK Rahul — AI Developer & Agentic Systems Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family: string, weight: number, text: string) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(cssUrl).then((r) => r.text());
  const match = css.match(/src: url\(([^)]+)\)/);
  if (!match) throw new Error(`Could not resolve font URL for ${family}`);
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

const EYEBROW_TEXT = "AVAILABLE FOR NEW PROJECTS";
const TAGS_TEXT = "LangChain · RAG · Multi-Agent Systems";

export default async function Image() {
  const name = "AK Rahul";
  const [displayFont, roleFont, labelFont] = await Promise.all([
    loadGoogleFont("Newsreader", 700, name),
    loadGoogleFont("Newsreader", 500, "AI Developer & Agentic Systems Engineer"),
    loadGoogleFont("IBM Plex Sans", 600, EYEBROW_TEXT + TAGS_TEXT),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#F6F2E7",
          fontFamily: "IBM Plex Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 10, height: 10, background: "#3C4F35" }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 5,
              color: "#3C4F35",
              fontWeight: 600,
            }}
          >
            {EYEBROW_TEXT}
          </div>
        </div>

        <div
          style={{
            fontFamily: "Newsreader",
            fontWeight: 700,
            fontSize: 132,
            color: "#28241C",
            lineHeight: 1,
            marginBottom: 22,
          }}
        >
          {name}
        </div>

        <div
          style={{
            fontFamily: "Newsreader",
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: 38,
            color: "#6E6A5C",
            marginBottom: 48,
          }}
        >
          AI Developer &amp; Agentic Systems Engineer
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 24, color: "#3C4F35", fontWeight: 600 }}>
          <div style={{ display: "flex" }}>LangChain</div>
          <div style={{ display: "flex", color: "#DCD3BE" }}>·</div>
          <div style={{ display: "flex" }}>RAG</div>
          <div style={{ display: "flex", color: "#DCD3BE" }}>·</div>
          <div style={{ display: "flex" }}>Multi-Agent Systems</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: displayFont, weight: 700, style: "normal" },
        { name: "Newsreader", data: roleFont, weight: 500, style: "italic" },
        { name: "IBM Plex Sans", data: labelFont, weight: 600, style: "normal" },
      ],
    }
  );
}
