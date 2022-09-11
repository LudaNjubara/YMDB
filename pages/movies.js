import Head from "next/head";

import MoviesData from "../components/Movies/MoviesData";

function movies() {
  return (
    <>
      <Head>
        <title>YMDB-Browse Movies</title>
      </Head>

      <MoviesData />
    </>
  );
}

export default movies;
