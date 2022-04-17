import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import Link from "next/link";
import uniqid from "uniqid";
import { baseImageURL, truncate } from "../Home/Row";
import { FaStar } from "react-icons/fa";
import styles from "../../styles/Movies/moviesData.module.css";

function MoviesData() {
  const [year, setYear] = useState(() => {
    const date = new Date();
    return date.getFullYear();
  });

  const { data, isSuccess, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "infiniteMovies",
    async ({ pageParam = 1 }) =>
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_year=${year}&page=${pageParam}`
      ).then((result) => result.json()),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.page < lastPage.total_pages) {
          return pages.length + 1;
        }
      },
    }
  );

  return (
    <>
      <main className={styles.movieDataContainer}>
        <aside className={styles.filterAndSortContainer}>aa</aside>
        <div
          id="scrollAreaContainerId"
          style={{
            height: 1000,
            overflow: "hidden",
          }}
        >
          {isSuccess && (
            <InfiniteScroll
              dataLength={data?.pages.length}
              next={fetchNextPage}
              hasMore={hasNextPage}
              scrollableTarget="scrollAreaContainerId"
              loader={
                <div className={styles.statusMessageContainer}>
                  <p className={styles.statusMessage}>Loading more movies...</p>
                </div>
              }
              endMessage={
                <div className={styles.statusMessageContainer}>
                  <p className={styles.statusMessage}>
                    Wow, you&apos;ve searched it all. We&apos;ve got no more.
                  </p>
                </div>
              }
            >
              <div className={styles.moviesContainer}>
                {data?.pages.map((page) =>
                  page.results.map((movie) => (
                    <Link href={`/movies/${encodeURIComponent(movie?.id)}`} key={uniqid()}>
                      <article className={`${styles.movieArticle}`} tabIndex="0">
                        <div className={styles.movieImageContainer}>
                          <Image
                            src={`${baseImageURL}${movie?.poster_path}`}
                            alt={movie?.name}
                            className={styles.movieImage}
                            width={230}
                            height={340}
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
                  ))
                )}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </main>
    </>
  );
}

export default MoviesData;
