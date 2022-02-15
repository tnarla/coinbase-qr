import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Screensaver } from "../components/Screensaver";

interface Props {
  value: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      value:
        (context.query?.value as string) || "https://www.twitter.com/trunarla",
    },
  };
};

const Home: NextPage<Props> = ({ value }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Custom Coinbase QR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@trunarla" />
        <meta name="twitter:creator" content="@trunarla" />
        <meta name="twitter:title" content="Coinbase QR ad" />
        <meta
          name="twitter:description"
          content="Generate a custom Coinbase QR code ad!"
        />
        <meta
          name="twitter:image"
          content={`https://coinbase-qr.vercel.app/api/card?value=${value}`}
        />
      </Head>

      {ready && <Screensaver value={value} />}
    </>
  );
};

export default Home;
