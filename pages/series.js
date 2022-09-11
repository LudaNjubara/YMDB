import Head from "next/head";
import SeriesData from "../components/Series/SeriesData";

function series() {
  return (
    <>
      <Head>
        <title>YMDB-Browse Series</title>
      </Head>

      <SeriesData />
    </>
  );
}

export default series;
