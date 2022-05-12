import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import rateLimit from "axios-rate-limit";
import instance from "../axios";

import MovieLoading from "./MovieLoading";
import MovieUnavailable from "./MovieUnavailable";
import MovieInfo from "./MovieInfo";

function Movie() {
  const [movieResults, setMovieResults] = useState({});
  const [isApiSubscribed, setIsApiSubscribed] = useState(true);
  const [movieLoaded, setMovieLoaded] = useState(false);
  const [movieUnavailable, setMovieUnavailable] = useState(false);

  const router = useRouter();
  const { movieId } = router.query;

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    const movieDetailsRequests = [
      `/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`,
      `/movie/${movieId}/credits?api_key=${process.env.API_KEY}&language=en-US`,
      `/movie/${movieId}/images?api_key=${process.env.API_KEY}`,
      `/movie/${movieId}/keywords?api_key=${process.env.API_KEY}`,
      `/movie/${movieId}/reviews?api_key=${process.env.API_KEY}&language=en-US&page=1`,
      `/movie/${movieId}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`,
      `/movie/${movieId}/videos?api_key=${process.env.API_KEY}&language=en-US`,
      `/movie/${movieId}/watch/providers?api_key=${process.env.API_KEY}`,
    ];

    const http = rateLimit(instance, {
      maxRequests: movieDetailsRequests.length,
      perMilliseconds: 600,
      maxRPS: 4,
    });

    function fetchMovie() {
      Promise.all(
        movieDetailsRequests.map(
          async (request) =>
            await http.get(request, {
              cancelToken: source.token,
            })
        )
      )
        .then((res) => {
          if (isApiSubscribed) {
            res.map((movieResult, index) => {
              switch (index) {
                case 0:
                  movieResults.details = movieResult.data;
                  break;
                case 1:
                  movieResults.credits = movieResult.data;
                  break;
                case 2:
                  movieResults.images = movieResult.data;
                  break;
                case 3:
                  movieResults.keywords = movieResult.data;
                  break;
                case 4:
                  movieResults.reviews = movieResult.data;
                  break;
                case 5:
                  movieResults.similar = movieResult.data;
                  break;
                case 6:
                  movieResults.videos = movieResult.data;
                  break;
                case 7:
                  movieResults.watchProviders = movieResult.data.results;
                  break;
                default:
                  break;
              }
              setMovieResults({ ...movieResults });
            });
            setMovieLoaded(true);
          }
        })
        .catch(() => setMovieUnavailable(true));
    }

    if (movieId) fetchMovie();

    return () => {
      setIsApiSubscribed(false);
      source.cancel("Request canceled.");
    };
  }, [movieId]);

  return (
    <>
      <Head>
        <title>
          YMDB-
          {movieResults?.details?.name ||
            movieResults?.details?.title ||
            movieResults?.details?.original_title}
        </title>
      </Head>
      <main>
        {movieUnavailable ? (
          <MovieUnavailable />
        ) : movieLoaded ? (
          <MovieInfo movieResults={movieResults} movieId={movieId} />
        ) : (
          <MovieLoading />
        )}
      </main>
    </>
  );
}

export default Movie;
