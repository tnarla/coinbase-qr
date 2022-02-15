import { useEffect, useState } from "react";
import { useDvdScreenSaver } from "react-dvd-screensaver";
import QRCode from "react-qr-code";

export const COLORS = [
    "#ff0000",
    "#ff4000",
    "#ff8000",
    "#ffbf00",
    "#ffff00",
    "#bfff00",
    "#80ff00",
    "#40ff00",
    "#00ff00",
    "#00ff40",
    "#00ff80",
    "#00ffbf",
    "#00ffff",
    "#00bfff",
    "#0080ff",
    "#0040ff",
    "#0000ff",
    "#4000ff",
    "#8000ff",
    "#bf00ff",
    "#ff00ff",
    "#ff00bf",
    "#ff0080",
    "#ff0040",
    "#ff0000",
  ] as const;

interface Props {
  value: string;
}

export function Screensaver({ value }: Props) {
  const dvdScreenSaver = useDvdScreenSaver({ speed: 0.13 });
  const [logoColor, setLogoColor] = useState<string>(COLORS[0]);

  useEffect(() => {
    setLogoColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }, [dvdScreenSaver.impactCount]);

  return (
    <div className="contents">
      <div className="content">
        <div ref={dvdScreenSaver.parentRef} className="hooks-parent">
          <div
            ref={dvdScreenSaver.childRef}
            className="hooks-child"
            style={{ backgroundColor: logoColor }}
          >
            <QRCode
              size={128}
              value={value || "https://www.twitter.com/trunarla"}
              bgColor={logoColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
