import Head from "next/head";
import Stats from "../components/Stats/Stats";

function stats() {
  return (
    <>
      <Head>
        <title key="title">YMDB-Trending stats</title>
      </Head>

      <Stats />
    </>
  );
}

export default stats;
