import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import uniqid from "uniqid";
import instance from "../axios";
import { baseImageURL, truncate } from "../Utils/utils";

import { FaStar } from "react-icons/fa";

import styles from "../../styles/Profile/profileNavSections.module.css";

function Watchlist({ watchlists }) {
  const [moviesWatchlist, setMoviesWatchlist] = useState([]);
  const [seriesWatchlist, setSeriesWatchlist] = useState([]);

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  function fetchDataFromWatchlists() {
    if (watchlists?.movies && watchlists?.movies.length > 0) {
      Promise.all(
        watchlists.movies.map(
          async (movieId) =>
            await instance.get(`/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`, {
              cancelToken: source.token,
            })
        )
      )
        .then((res) => {
          res.map((movie) => {
            setMoviesWatchlist((prevMoviesWatchlist) => [...prevMoviesWatchlist, movie.data]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (watchlists?.series && watchlists?.series.length > 0) {
      Promise.all(
        watchlists.series.map(
          async (serieId) =>
            await instance.get(`/tv/${serieId}?api_key=${process.env.API_KEY}&language=en-US`, {
              cancelToken: source.token,
            })
        )
      )
        .then((res) => {
          res.map((movie) => {
            setSeriesWatchlist((prevSeriesWatchlist) => [...prevSeriesWatchlist, movie.data]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    fetchDataFromWatchlists();

    return () => {
      setMoviesWatchlist([]);
      setSeriesWatchlist([]);
    };
  }, []);

  return (
    <section>
      <article className={styles.navSectionContentArticle}>
        <div className={styles.titleAndDescriptionContainer}>
          <h3 className={styles.articleTitle}>Watchlist</h3>
          <p className={styles.articleDescription}>
            Here is where all your movies you wish to watch reside. To add movies to your Watchlist simply
            click/tap on button &quot;Add to Watchlist&quot; when viewing a specific movie and you will be
            able to see them here.
          </p>
        </div>

        <div className={styles.articleContent}>
          <div className={styles.watchlistAndFavouritesContainer}>
            {moviesWatchlist &&
              moviesWatchlist.map((movie) => {
                return (
                  movie.poster_path && (
                    <Link href={`/movies/${encodeURIComponent(movie.id)}`} key={uniqid()}>
                      <article className={`${styles.watchlistAndFavouritesItem}`} tabIndex="0">
                        <div className={styles.watchlistAndFavouritesImageContainer}>
                          <Image
                            src={`${baseImageURL}${movie.poster_path}`}
                            alt={movie.name}
                            className={styles.watchlistAndFavouritesImage}
                            width={200}
                            height={310}
                          />
                        </div>
                        <div className={styles.watchlistAndFavouritesTitleAndVoteAvg}>
                          <h3 className={styles.watchlistAndFavouritesTitle}>
                            {movie.name || movie.title || movie.original_name}
                          </h3>
                          <div className={styles.watchlistAndFavouritesVoteContainer}>
                            <span className={styles.watchlistAndFavouritesVoteAvg}>
                              {movie?.vote_average.toFixed(1)}
                            </span>
                            <FaStar className={styles.watchlistAndFavouritesVoteIcon} />
                          </div>
                        </div>
                        <p className={styles.watchlistAndFavouritesDescription}>
                          {truncate(movie?.overview, 245)}
                        </p>
                      </article>
                    </Link>
                  )
                );
              })}
            {/* --------------------------- */}
            {seriesWatchlist &&
              seriesWatchlist.map((serie) => {
                return (
                  serie.poster_path && (
                    <Link href={`/series/${encodeURIComponent(serie.id)}`} key={uniqid()}>
                      <article className={`${styles.watchlistAndFavouritesItem}`} tabIndex="0">
                        <div className={styles.watchlistAndFavouritesImageContainer}>
                          <Image
                            src={`${baseImageURL}${serie.poster_path}`}
                            alt={serie.name}
                            className={styles.watchlistAndFavouritesImage}
                            width={200}
                            height={310}
                          />
                        </div>
                        <div className={styles.watchlistAndFavouritesTitleAndVoteAvg}>
                          <h3 className={styles.watchlistAndFavouritesTitle}>
                            {serie.name || serie.original_name}
                          </h3>
                          <div className={styles.watchlistAndFavouritesVoteContainer}>
                            <span className={styles.watchlistAndFavouritesVoteAvg}>
                              {serie?.vote_average.toFixed(1)}
                            </span>
                            <FaStar className={styles.watchlistAndFavouritesVoteIcon} />
                          </div>
                        </div>
                        <p className={styles.watchlistAndFavouritesDescription}>
                          {truncate(serie?.overview, 245)}
                        </p>
                      </article>
                    </Link>
                  )
                );
              })}
          </div>
        </div>
      </article>
    </section>
  );
}

export default Watchlist;
