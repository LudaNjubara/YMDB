import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import rateLimit from "axios-rate-limit";
import instance from "../axios";
import MovieLoading from "./MovieLoading";
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
                  movieResults.movieDetails = movieResult.data;
                  break;
                case 1:
                  movieResults.movieCredits = movieResult.data;
                  break;
                case 2:
                  movieResults.movieImages = movieResult.data;
                  break;
                case 3:
                  movieResults.movieKeywords = movieResult.data;
                  break;
                case 4:
                  movieResults.movieReviews = movieResult.data;
                  break;
                case 5:
                  movieResults.movieSimilar = movieResult.data;
                  break;
                case 6:
                  movieResults.movieVideos = movieResult.data;
                  break;
                case 7:
                  movieResults.movieWatchProviders = movieResult.data.results;
                  break;
                default:
                  break;
              }
              setMovieResults({ ...movieResults });
            });
            setMovieLoaded(true);
          }
        })
        .catch((err) => {
          if (axios.isCancel()) console.error(err.message);
          setMovieUnavailable(true);
        });
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
          {movieResults?.movieDetails?.name ||
            movieResults?.movieDetails?.title ||
            movieResults?.movieDetails?.original_title}
        </title>
      </Head>
      <main>
        {movieUnavailable ? (
          "Movie unavailable"
        ) : movieLoaded ? (
          <MovieInfo movieResults={movieResults} />
        ) : (
          <MovieLoading />
        )}
      </main>
    </>
  );
}

export default Movie;
