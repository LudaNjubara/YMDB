import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import uniqid from "uniqid";
import axios from "axios";
import instance from "../axios";
import HorizontalScrollButton from "../Reusable/HorizontalScrollButtons";
import { baseImageURL, truncate } from "../Utils/utils";

import { FaStar } from "react-icons/fa";

import styles from "../../styles/Home/row.module.css";

function Row({ title, fetchURL, isLarge }) {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [isApiSubscribed, setIsApiSubscribed] = useState(true);
  const [displayMovieRow, setDisplayMovieRow] = useState(false);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    async function fetchMoviesData() {
      await instance
        .get(fetchURL, {
          cancelToken: source.token,
        })
        .then((res) => {
          if (isApiSubscribed) {
            setMovies(res.data.results);
            setDisplayMovieRow(true);
          }
        })
        .catch((err) => {
          if (axios.isCancel()) {
            console.error(err.message);
            setDisplayMovieRow(false);
          }
        });

      return () => {
        setDisplayMovieRow(false);
        setIsApiSubscribed(false);
        source.cancel("Request canceled.");
      };
    }
    fetchMoviesData();
  }, [fetchURL]);

  return (
    displayMovieRow && (
      <section className={styles.section} key={uniqid()}>
        <div className={styles.sectionTitleContainer}>
          <h2 className={styles.sectionTitle}>
            {title}
            {isLarge ? <Image src="/netflix_logo.png" alt="Netflix Logo" width={90} height={30} /> : ""}
          </h2>
        </div>
        <div className={styles.moviesContainer}>
          <HorizontalScrollButton side="left" isNetflix={isLarge} />
          {!isLarge &&
            movies.map(
              (movie) =>
                movie?.backdrop_path && (
                  <Link href={`/movies/${encodeURIComponent(movie?.id)}`} key={uniqid()}>
                    <article className={styles.movieArticle} tabIndex="0">
                      <div className={styles.movieImageContainer}>
                        <Image
                          src={`${baseImageURL}${movie?.backdrop_path}`}
                          alt={movie?.name}
                          className={styles.movieImage}
                          layout="fill"
                        />
                      </div>
                      <div className={styles.movieContent}>
                        <div className={styles.movieTitleAndVoteAvg}>
                          <h3 className={styles.movieTitle}>
                            {movie?.name || movie?.title || movie?.original_title}
                          </h3>
                          <div className={styles.movieVoteContainer}>
                            <span className={styles.movieVoteAvg}>
                              {movie?.vote_average ? movie?.vote_average : "N/A"}
                            </span>
                            <FaStar className={styles.movieVoteIcon} />
                          </div>
                        </div>
                        <p className={styles.movieDescription}>{truncate(movie?.overview)}</p>
                      </div>
                    </article>
                  </Link>
                )
            )}
          {isLarge &&
            movies.map(
              (movie) =>
                movie?.poster_path && (
                  <Link href={`/series/${encodeURIComponent(movie?.id)}`} key={uniqid()}>
                    <article className={`${styles.movieArticle} ${styles.large}`} tabIndex="0">
                      <div className={styles.movieImageContainer}>
                        <Image
                          src={`${baseImageURL}${movie?.poster_path}`}
                          alt={movie?.name}
                          className={styles.movieImage}
                          layout="fill"
                        />
                      </div>
                      <div className={styles.movieTitleAndVoteAvg}>
                        <h3 className={styles.movieTitle}>
                          {movie?.name || movie?.title || movie?.original_name}
                        </h3>
                        <div className={styles.movieVoteContainer}>
                          <span className={styles.movieVoteAvg}>{movie?.vote_average}</span>
                          <FaStar className={styles.movieVoteIcon} />
                        </div>
                      </div>
                      <p className={styles.movieDescription}>{truncate(movie?.overview, 338)}</p>
                    </article>
                  </Link>
                )
            )}

          <HorizontalScrollButton side="right" isNetflix={isLarge} />
        </div>
      </section>
    )
  );
}
export default Row;
