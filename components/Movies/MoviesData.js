import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import Link from "next/link";
import uniqid from "uniqid";
import { baseImageURL, truncate, currentYear, getListOfSelectableYears } from "../Utils/utils";

import { FaStar, FaSearch } from "react-icons/fa";

import styles from "../../styles/Movies/moviesData.module.css";

function MoviesData() {
  const genresArray = [
    { id: null, name: "All" },
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TvMovie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const [genre, setGenre] = useState(null);
  const [year, setYear] = useState(currentYear());
  let selectedYearOptionIndex = selectedYearOptionIndex || 0;
  let selectedGenreOptionIndex = selectedGenreOptionIndex || 0;

  const fetchMovies = async ({ pageParam = 1 }) =>
    await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        process.env.API_KEY
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_year=${year}${
        genre ? `&with_genres=${genre}` : null
      }&page=${pageParam}`
    ).then((result) => result.json());

  const { data, isSuccess, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["infiniteMovies", year, genre],
    fetchMovies,
    {
      refetchOnWindowFocus: false,
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
            <select
              name="genreSelect"
              id="genreSelectId"
              className={styles.filterAndSortSelect}
              defaultValue={genre}
            >
              {genresArray.map((genre) => {
                return (
                  <option value={genre.id} key={uniqid()}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={styles.filterAndSortInnerContainer}>
            <h3 className={styles.filterAndSortTitle}>Year</h3>
            <select
              name="yearSelect"
              id="yearSelectId"
              className={styles.filterAndSortSelect}
              defaultValue={year}
            >
              {getListOfSelectableYears().map((year) => (
                <option value={year} key={uniqid()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* <div className={styles.filterAndSortInnerContainer}>
            <h3 className={styles.filterAndSortTitle}>Sort</h3>
          </div> */}

          <button
            type="button"
            className={styles.filterAndSortButton}
            onClick={() => {
              const yearSelect = document.getElementById("yearSelectId");
              const genreSelect = document.getElementById("genreSelectId");

              console.log(selectedYearOptionIndex);
              selectedYearOptionIndex = yearSelect.selectedIndex;
              selectedGenreOptionIndex = genreSelect.selectedIndex;
              console.log(selectedYearOptionIndex);

              setYear(yearSelect.value);
              setGenre(genreSelect.value);
            }}
          >
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
              height={1200}
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
