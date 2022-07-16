import Head from "next/head";

import requests from "../components/requests";
import Hero from "../components/Home/Hero";
import ViewAll from "../components/Home/ViewAll";
import Row from "../components/Home/Row";
import Join from "../components/Home/Join";

export default function Home() {
  return (
    <div id="root">
      <Head>
        <title key="title">YMDB - Your Movie DataBase</title>
        <meta name="google-site-verification" content="XJNmUcYtBUBDsXwwo3qJbIekYufFozDjpMFU1fS2O80" />
        <meta
          name="description"
          content="Browse all the movies and TV Shows. Make your account for free, create your watchlists, mark your favourites and find out all important info about any movie, TV Show or person, in a glimpse."
        />
      </Head>

      <Hero fetchURL={requests.fetchTrending} />

      <main>
        <ViewAll />

        <Row title="Trending Movies" fetchURL={requests.fetchTrending} />
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
