import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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

export default async function Icon() {
  const font = await loadGoogleFont("Newsreader", 700, "A");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2B4459",
          fontFamily: "Newsreader",
          fontWeight: 700,
          fontSize: 22,
          color: "#EFEBE1",
        }}
      >
        A
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Newsreader", data: font, weight: 700, style: "normal" }],
    }
  );
}
