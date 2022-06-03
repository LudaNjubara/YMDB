import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import uniqid from "uniqid";
import moment from "moment";
import axios from "axios";
import { database } from "../firebase";
import instance from "../axios";
import HorizontalScrollButton from "../Reusable/HorizontalScrollButtons";
import { baseImageURL, truncate } from "../Utils/utils";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  DoughnutController,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  getDoc,
  getDocs,
  doc,
  collection,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";

import { FaStar } from "react-icons/fa";

import styles from "../../styles/Stats/stats.module.css";

ChartJS.register(
  ArcElement,
  DoughnutController,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

function Stats() {
  const [top10MoviesDetails, setTop10MoviesDetails] = useState([]);
  const [top10SeriesDetails, setTop10SeriesDetails] = useState([]);
  const [totalViewCountMovies, setTotalViewCountMovies] = useState(null);
  const [totalViewCountSeries, setTotalViewCountSeries] = useState(null);
  const [mostCommentedMovie, setMostCommentedMovie] = useState({});
  const [mostCommentedSerie, setMostCommentedSerie] = useState({});
  const [canLoadCharts, setCanLoadCharts] = useState(false);
  let movieTitle = "";
  let serieTitle = "";
  let movieDetails = {};
  let serieDetails = {};

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  async function getPageStatsData(timeAgo) {
    setTop10MoviesDetails([]);
    setTop10SeriesDetails([]);

    /* Get movies data */
    const moviesQuery = query(
      collection(database, "pageStatistics/moviesData/allViewedMovies"),
      where(
        "dateFirstViewed",
        ">=",
        Timestamp.fromDate(
          moment()
            .subtract(timeAgo === "week" ? 14 : 1, timeAgo === "week" ? "days" : "months")
            .toDate()
        )
      ),
      orderBy("dateFirstViewed", "desc"),
      orderBy("numOfViews", "desc"),
      limit(10)
    );

    const querySnapshotMovies = await getDocs(moviesQuery);

    querySnapshotMovies.forEach(async (doc) => {
      movieDetails = await fetchMovieOrSerieDetails(doc.id, true);
      setTop10MoviesDetails((prevState) => [...prevState, movieDetails]);
    });

    /* Get series data */
    const seriesQuery = query(
      collection(database, "pageStatistics/seriesData/allViewedSeries"),
      where(
        "dateFirstViewed",
        ">=",
        Timestamp.fromDate(
          moment()
            .subtract(timeAgo === "week" ? 14 : 1, timeAgo === "week" ? "days" : "months")
            .toDate()
        )
      ),
      orderBy("dateFirstViewed", "desc"),
      orderBy("numOfViews", "desc"),
      limit(10)
    );

    const querySnapshotSeries = await getDocs(seriesQuery);

    querySnapshotSeries.forEach(async (doc) => {
      serieDetails = await fetchMovieOrSerieDetails(doc.id, false);
      setTop10SeriesDetails((prevState) => [...prevState, serieDetails]);
    });
  }

  async function getMostCommentedMovieOrSerie(isMovie) {
    const q = query(
      collection(database, `${isMovie ? "movies" : "series"}`),
      orderBy("numOfReviews", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (isMovie) {
      querySnapshot.forEach(async (doc) => {
        movieTitle = await fetchMovieOrSerieTitle(doc.id, true);
        mostCommentedMovie.numOfReviews = doc.data().numOfReviews;
        mostCommentedMovie.title = movieTitle;
        setMostCommentedMovie({ ...mostCommentedMovie });
      });
    } else {
      querySnapshot.forEach(async (doc) => {
        serieTitle = await fetchMovieOrSerieTitle(doc.id, false);
        mostCommentedSerie.numOfReviews = doc.data()?.numOfReviews;
        mostCommentedSerie.title = serieTitle;
        setMostCommentedSerie({ ...mostCommentedSerie });
      });
    }
  }

  function getTotalViewsCountForMovieOrSerie() {
    getDoc(doc(database, "pageStatistics/views"))
      .then((viewsData) => {
        setTotalViewCountMovies(Number(viewsData.data().numOfViewedMovies));
        setTotalViewCountSeries(Number(viewsData.data().numOfViewedSeries));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function fetchMovieOrSerieTitle(id, isMovie) {
    const fetchURL = isMovie
      ? `/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
      : `/tv/${id}?api_key=${process.env.API_KEY}&language=en-US`;

    const req = await instance
      .get(fetchURL, {
        cancelToken: source.token,
      })
      .catch((error) => {
        console.error(error);
      });

    const resultName =
      req.data?.title || req.data?.original_title || req.data?.name || req.data?.original_name;

    return resultName;
  }

  async function fetchMovieOrSerieDetails(id, isMovie) {
    const fetchURL = isMovie
      ? `/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
      : `/tv/${id}?api_key=${process.env.API_KEY}&language=en-US`;

    const req = await instance
      .get(fetchURL, {
        cancelToken: source.token,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
      });

    return req;
  }

  function chartData(typeOfChart) {
    switch (typeOfChart) {
      case "totalViewCount":
        return {
          labels: ["Movies", "Series"],
          datasets: [
            {
              data: [totalViewCountMovies, totalViewCountSeries],
              backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)", "rgba(153, 102, 255, 1)"],
              borderWidth: 1,
            },
          ],
        };
      case "mostCommented":
        return {
          labels: ["Movie", "Serie"],
          datasets: [
            {
              data: [
                {
                  numOfReviews: mostCommentedMovie.numOfReviews,
                  title: mostCommentedMovie.title,
                },
                {
                  numOfReviews: mostCommentedSerie.numOfReviews,
                  title: mostCommentedSerie.title,
                },
              ],
              backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)", "rgba(153, 102, 255, 1)"],
              borderWidth: 1,
            },
          ],
        };
    }
  }

  function chartOptions(typeOfChart) {
    switch (typeOfChart) {
      case "totalViewCount":
        return {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            xAxis: {
              beginAtZero: true,
            },
          },
          elements: {
            bar: {
              borderWidth: 3,
              barPercentage: 0.2,
              categoryPercantage: 1,
            },
          },
          responsive: true,
          indexAxis: "y",
        };
      case "mostCommented":
        return {
          parsing: {
            key: "numOfReviews",
          },
          plugins: {
            tooltip: {
              callbacks: {
                beforeLabel: (context) => {
                  return ` ${context.raw.title}`;
                },
                label: (context) => {
                  return ` Number of reviews: ${context.raw.numOfReviews}`;
                },
              },
            },
          },
          cutout: "35%",
          responsive: true,
        };
    }
  }

  useEffect(() => {
    getTotalViewsCountForMovieOrSerie();
    getMostCommentedMovieOrSerie(true);
    getMostCommentedMovieOrSerie(false);
    getPageStatsData("week");

    if (document.readyState !== "loading") {
      setCanLoadCharts(true);
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        setCanLoadCharts(true);
      });
    }

    return () => {
      setTop10MoviesDetails([]);
      setTop10SeriesDetails([]);
      setTotalViewCountMovies(null);
      setTotalViewCountSeries(null);
      setMostCommentedMovie({});
      setMostCommentedSerie({});
      setCanLoadCharts(false);
    };
  }, []);

  return (
    <>
      <div id="root" className={styles.statsWrapper}>
        {totalViewCountMovies && totalViewCountSeries ? (
          <>
            <section className={styles.statChartSection}>
              <article className={styles.statChartArticle}>
                <h2 className={styles.statChartArticleTitle}>Total view count</h2>
                {canLoadCharts && (
                  <Bar
                    data={chartData("totalViewCount")}
                    height={100}
                    options={chartOptions("totalViewCount")}
                  />
                )}
              </article>
            </section>
          </>
        ) : (
          <div className={styles.noDataMessage}>No data</div>
        )}

        {mostCommentedMovie || mostCommentedSerie ? (
          <section className={styles.statChartSection}>
            <article className={`${styles.statChartArticle} ${styles.mostCommentedArticle}`}>
              <h2 className={styles.statChartArticleTitle}>Most reviewed movie & serie</h2>
              {canLoadCharts && (
                <Doughnut data={chartData("mostCommented")} options={chartOptions("mostCommented")} />
              )}
            </article>
          </section>
        ) : (
          <div className={styles.noDataMessage}>No data</div>
        )}

        {top10MoviesDetails || typeof top10SeriesDetails ? (
          <section className={styles.statChartSection}>
            <h2 className={styles.statChartArticleTitle}>Top 10 movies & series</h2>

            <div className={styles.chooseTimeAgoContainer}>
              <div className={styles.chooseTimeAgoButtonsContainer}>
                <span className={styles.backgroundPill}></span>
                <button
                  type="button"
                  className={styles.chooseTimeAgoButton}
                  onClick={() => {
                    // get closest span element and add class monthActive
                    const backgroundPill = document.querySelector(`.${styles.backgroundPill}`);
                    backgroundPill.classList.remove(styles.monthActive);
                    getPageStatsData("week");
                  }}
                >
                  2 Weeks
                </button>
                <button
                  type="button"
                  className={styles.chooseTimeAgoButton}
                  onClick={() => {
                    const backgroundPill = document.querySelector(`.${styles.backgroundPill}`);
                    backgroundPill.classList.add(styles.monthActive);
                    getPageStatsData("month");
                  }}
                >
                  Last Month
                </button>
              </div>
            </div>

            {top10MoviesDetails && (
              <article className={styles.statChartArticle}>
                <h3 className={styles.statChartArticleTitle_small}>Movies</h3>

                <div className={styles.relatedScrollableRow}>
                  <HorizontalScrollButton side="left" />
                  {top10MoviesDetails.map(
                    (movie) =>
                      movie?.backdrop_path && (
                        <Link href={`/movies/${encodeURIComponent(movie?.id)}`} key={uniqid()}>
                          <article className={styles.relatedContainer} tabIndex="0">
                            <div className={styles.relatedImageContainer}>
                              <Image
                                src={`${baseImageURL}${movie?.backdrop_path}`}
                                alt={movie?.name}
                                className={styles.relatedImage}
                                layout="fill"
                              />
                            </div>
                            <div className={styles.relatedContent}>
                              <div className={styles.relatedTitleAndVoteAvg}>
                                <h3 className={styles.relatedTitle}>
                                  {movie?.name || movie?.title || movie?.original_title}
                                </h3>
                                <div className={styles.movieVoteContainer}>
                                  <span className={styles.relatedVoteAvg}>
                                    {movie?.vote_average ? movie?.vote_average.toFixed(1) : "N/A"}
                                  </span>
                                  <FaStar className={styles.relatedVoteIcon} />
                                </div>
                              </div>
                              <p className={styles.relatedDescription}>{truncate(movie?.overview)}</p>
                            </div>
                          </article>
                        </Link>
                      )
                  )}
                  <HorizontalScrollButton side="right" />
                </div>
              </article>
            )}

            {top10SeriesDetails && (
              <article className={styles.statChartArticle}>
                <h3 className={styles.statChartArticleTitle_small}>Series</h3>
                <div className={styles.relatedScrollableRow}>
                  <HorizontalScrollButton side="left" />
                  {top10SeriesDetails.map(
                    (serie) =>
                      serie?.backdrop_path && (
                        <Link href={`/series/${encodeURIComponent(serie?.id)}`} key={uniqid()}>
                          <article className={styles.relatedContainer} tabIndex="0">
                            <div className={styles.relatedImageContainer}>
                              <Image
                                src={`${baseImageURL}${serie?.backdrop_path}`}
                                alt={serie?.name}
                                className={styles.relatedImage}
                                layout="fill"
                              />
                            </div>
                            <div className={styles.relatedContent}>
                              <div className={styles.relatedTitleAndVoteAvg}>
                                <h3 className={styles.relatedTitle}>{serie?.name || serie?.original_name}</h3>
                                <div className={styles.movieVoteContainer}>
                                  <span className={styles.relatedVoteAvg}>
                                    {serie?.vote_average ? serie?.vote_average.toFixed(1) : "N/A"}
                                  </span>
                                  <FaStar className={styles.relatedVoteIcon} />
                                </div>
                              </div>
                              <p className={styles.relatedDescription}>{truncate(serie?.overview)}</p>
                            </div>
                          </article>
                        </Link>
                      )
                  )}
                  <HorizontalScrollButton side="right" />
                </div>
              </article>
            )}
          </section>
        ) : (
          <div className={styles.noDataMessage}>No data</div>
        )}
      </div>
    </>
  );
}

export default Stats;
