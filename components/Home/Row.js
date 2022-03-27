import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import instance from "../axios";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import styles from "../../styles/Home/row.module.css";

const baseImageURL = "https://image.tmdb.org/t/p/original";

/**
 * @param {string} string
 * @param {integer} length
 */
function truncate(string, length = 180) {
  return string?.length > length ? string?.substring(0, length) + "..." : string;
}

function Row({ title, fetchURL, isLarge }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();
    let isApiSubscribed = true;

    async function fetchMoviesData() {
      await instance
        .get(fetchURL, {
          cancelToken: source.token,
        })
        .then((res) => {
          if (isApiSubscribed) {
            setMovies(res.data.results);
          }
        })
        .catch((err) => {
          if (axios.isCancel()) console.error(err.message);
        });

      return () => {
        isApiSubscribed = false;
        source.cancel("Request canceled.");
      };
    }
    fetchMoviesData();
  }, [fetchURL]);

  return (
    <section className={styles.section} key={title}>
      <div className={styles.sectionTitleContainer}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {isLarge ? <Image src="/netflix_logo.png" alt="Netflix Logo" width={90} height={30} /> : ""}
      </div>
      <div className={styles.moviesContainer}>
        {!isLarge &&
          movies.map(
            (movie) =>
              movie?.backdrop_path && (
                <Link href={`/${encodeURIComponent(movie?.id)}`} key={movie?.id}>
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
                <Link href={`/${encodeURIComponent(movie?.id)}`} key={movie?.id}>
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
      </div>
    </section>
  );
}

export { truncate, baseImageURL };
export default Row;
