import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import Link from "next/link";
import uniqid from "uniqid";
import { baseImageURL, truncate } from "../Home/Row";
import { FaStar, FaSearch } from "react-icons/fa";
import styles from "../../styles/Movies/moviesData.module.css";

function MoviesData() {
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];
  const [year, setYear] = useState(() => {
    const date = new Date();
    return date.getFullYear();
  });

  function getListOfSelectableYears() {
    const listOfYears = [];
    for (let i = year - 1; i >= 1950; i--) {
      listOfYears.push(i);
    }
    return listOfYears;
  }

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
        <aside className={styles.filterAndSortContainer}>
          <div className={styles.filterAndSortInnerContainer}>
            <h3 className={styles.filterAndSortTitle}>Genre</h3>
            <select name="genreSelect" id="genreSelectId" className={styles.filterAndSortSelect}>
              <option value="All" defaultValue key={uniqid()}>
                All
              </option>
              {genres.map((genre) => (
                <option value={genre} key={uniqid()}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterAndSortInnerContainer}>
            <h3 className={styles.filterAndSortTitle}>Year</h3>
            <select name="yearSelect" id="yearSelectId" className={styles.filterAndSortSelect}>
              <option value={year} defaultValue key={uniqid()}>
                {year}
              </option>
              {getListOfSelectableYears().map((year) => (
                <option value={year} key={uniqid()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterAndSortInnerContainer}>
            <h3 className={styles.filterAndSortTitle}>Sort</h3>
          </div>

          <button type="button" className={styles.filterAndSortButton}>
            <FaSearch className={styles.filterAndSortButtonIcon} /> Search
          </button>
        </aside>

        <div className={styles.infiniteScrollWrapper}>
          {isSuccess && (
            <InfiniteScroll
              className={styles.moviesContainer}
              dataLength={data?.pages.length}
              next={fetchNextPage}
              hasMore={hasNextPage}
              height={1300}
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
              {data?.pages.map((page) =>
                page.results.map(
                  (movie) =>
                    movie.poster_path && (
                      <Link href={`/movies/${encodeURIComponent(movie.id)}`} key={uniqid()}>
                        <article className={`${styles.movieArticle}`} tabIndex="0">
                          <div className={styles.movieImageContainer}>
                            <Image
                              src={`${baseImageURL}${movie.poster_path}`}
                              alt={movie.name}
                              className={styles.movieImage}
                              width={200}
                              height={310}
                            />
                          </div>
                          <div className={styles.movieTitleAndVoteAvg}>
                            <h3 className={styles.movieTitle}>
                              {movie.name || movie.title || movie.original_name}
                            </h3>
                            <div className={styles.movieVoteContainer}>
                              <span className={styles.movieVoteAvg}>{movie?.vote_average}</span>
                              <FaStar className={styles.movieVoteIcon} />
                            </div>
                          </div>
                          <p className={styles.movieDescription}>{truncate(movie?.overview, 310)}</p>
                        </article>
                      </Link>
                    )
                )
              )}
            </InfiniteScroll>
          )}
        </div>
      </main>
    </>
  );
}

export default MoviesData;
