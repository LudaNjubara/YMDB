import Head from "next/head";
import requests from "../components/requests";
import Hero from "../components/Home/Hero";
import Row from "../components/Home/Row";
import Join from "../components/Home/Join";

export default function Home() {
  return (
    <div id="root">
      <Head>
        <title key="title">YMDB - Your Movie DataBase</title>
      </Head>

      <Hero fetchURL={requests.fetchTrending} />

      <main>
        <Row title="Trending Now" fetchURL={requests.fetchTrending} />
        <Row title="Playing on" fetchURL={requests.fetchNetflixOriginals} isLarge />
        <Row title="Upcoming Movies" fetchURL={requests.fetchUpcomingMovies} />

        <Join />

        <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
        <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
        <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      </main>
    </div>
  );
}
