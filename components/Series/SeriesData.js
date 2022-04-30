import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import Link from "next/link";
import uniqid from "uniqid";
import { baseImageURL, truncate } from "../Home/Row";
import { FaStar, FaSearch } from "react-icons/fa";
import styles from "../../styles/Series/seriesData.module.css";

function SeriesData() {
  const genresArray = [
    { name: "All", id: null },
    { name: "Action & Adventure", id: 10759 },
    { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 },
    { name: "Crime", id: 80 },
    { name: "Documentary ", id: 99 },
    { name: "Drama", id: 18 },
    { name: "Family ", id: 10751 },
    { name: "Kids   ", id: 10762 },
    { name: "Mystery  ", id: 9648 },
    { name: "News     ", id: 10763 },
    { name: "Reality  ", id: 10764 },
    { name: "Sci-Fi & Fantasy", id: 10765 },
    { name: "Soap     ", id: 10766 },
    { name: "Talk      ", id: 10767 },
    { name: "War & Politics ", id: 10768 },
    { name: "Western    ", id: 37 },
  ];

  const currentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  const [genre, setGenre] = useState(null);
  const [year, setYear] = useState(currentYear);
  let selectedYearOptionIndex = selectedYearOptionIndex || 0;
  let selectedGenreOptionIndex = selectedGenreOptionIndex || 0;

  function getListOfSelectableYears() {
    const listOfYears = [];

    for (let i = currentYear(); i >= 1950; i--) {
      listOfYears.push(i);
    }
    return listOfYears;
  }

  const fetchSeries = async ({ pageParam = 1 }) =>
    await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${
        process.env.API_KEY
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&first_air_date_year=${year}${
        genre ? `&with_genres=${genre}` : null
      }&page=${pageParam}`
    ).then((result) => result.json());

  const { data, isSuccess, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["infiniteSeries", year, genre],
    fetchSeries,
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
      <main className={styles.serieDataContainer}>
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

          <div className={styles.filterAndSortInnerContainer}>
            <h3 className={styles.filterAndSortTitle}>Sort</h3>
          </div>

          <button
            type="button"
            className={styles.filterAndSortButton}
            onClick={() => {
              const yearSelect = document.getElementById("yearSelectId");
              const genreSelect = document.getElementById("genreSelectId");

              selectedYearOptionIndex = yearSelect.selectedIndex;
              selectedGenreOptionIndex = genreSelect.selectedIndex;

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
              className={styles.seriesContainer}
              dataLength={data?.pages.length}
              next={fetchNextPage}
              hasMore={hasNextPage}
              height={1200}
              loader={
                <div className={styles.statusMessageContainer}>
                  <p className={styles.statusMessage}>Loading more series...</p>
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
                  (serie) =>
                    serie.poster_path && (
                      <Link href={`/series/${encodeURIComponent(serie.id)}`} key={uniqid()}>
                        <article className={`${styles.serieArticle}`} tabIndex="0">
                          <div className={styles.serieImageContainer}>
                            <Image
                              src={`${baseImageURL}${serie.poster_path}`}
                              alt={serie.name}
                              className={styles.serieImage}
                              width={200}
                              height={310}
                            />
                          </div>
                          <div className={styles.serieTitleAndVoteAvg}>
                            <h3 className={styles.serieTitle}>{serie.name || serie.original_name}</h3>
                            <div className={styles.serieVoteContainer}>
                              <span className={styles.serieVoteAvg}>{serie?.vote_average}</span>
                              <FaStar className={styles.serieVoteIcon} />
                            </div>
                          </div>
                          <p className={styles.serieDescription}>{truncate(serie?.overview, 310)}</p>
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

export default SeriesData;
