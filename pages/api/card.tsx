import type { NextApiHandler } from "next";
import { renderToStaticMarkup } from "react-dom/server";
import QRCode from "react-qr-code";
import sharp from "sharp";
import { COLORS } from "../../components/Screensaver";

const SIZE = 164;
const PADDING = 10;
const START_X = 50;
const START_Y = 64;

const handler: NextApiHandler = async (req, res) => {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  const cardSVGBuffer = Buffer.from(
    renderToStaticMarkup(
      <svg xmlns="http://www.w3.org/2000/svg" width={800} height={418}>
        <g>
          <rect x="0" y="0" width={800} height={418} fill="black" />
          <rect
            x={START_X - PADDING}
            y={START_Y - PADDING}
            width={SIZE + PADDING * 2}
            height={SIZE + PADDING * 2}
            fill={color}
          />
        </g>
        <svg x={START_X} y={START_Y}>
          <QRCode
            size={SIZE}
            value={
              (req.query.value as string) || "https://www.twitter.com/trunarla"
            }
            bgColor={color}
          />
        </svg>
      </svg>
    )
  );

  const png = await sharp(cardSVGBuffer).png().toBuffer();

  res
    .status(200)
    .setHeader("Content-Type", "image/png")
    .setHeader("Cache-Control", "public, max-age=604800")
    .send(png);
};

export default handler;
