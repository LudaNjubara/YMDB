import { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import { database } from "../firebase";
import { doc, getDoc, updateDoc, setDoc, increment, Timestamp } from "firebase/firestore";
import { baseImageURL, formatDuration } from "../Utils/utils";

import ImageAndUserActionsContainer from "../Reusable/MovieSerie/ImageAndUserActionsContainer";
import CastAndCrewRow from "../Reusable/MovieSerie/CastAndCrewRow";
import WhereToWatchRow from "../Reusable/MovieSerie/WhereToWatchRow";
import KeywordsContainer from "../Reusable/MovieSerie/KeywordsContainer";
import ImagesRow from "../Reusable/MovieSerie/ImagesRow";
import SimilarRow from "../Reusable/MovieSerie/SimilarRow";
import CommentsContainer from "../Reusable/MovieSerie/CommentsContainer";
import ReviewForm from "../Reusable/MovieSerie/ReviewForm";

import { BsStarFill, BsCalendar3, BsPlayFill } from "react-icons/bs";
import { FiClock } from "react-icons/fi";

import reusableStyles from "../../styles/Reusable/movieSerie.module.css";

function MovieInfo({ movieResults, movieId }) {
  const [showBackgroundDarkener, setShowBackgroundDarkener] = useState(false);
  const [showTrailerPopup, setShowTrailerPopup] = useState(false);
  const movieDuration = movieResults?.details?.runtime;

  async function handleStatistics() {
    const docSnap = await getDoc(doc(database, "pageStatistics/moviesData/allViewedMovies", movieId));

    if (docSnap.exists()) {
      updateDoc(doc(database, `pageStatistics/moviesData/allViewedMovies/${movieId}`), {
        numOfViews: increment(1),
        dateLastViewed: Timestamp.fromDate(new Date()),
      })
        .then((doc) => {
          console.log(doc);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setDoc(doc(database, `pageStatistics/moviesData/allViewedMovies/${movieId}`), {
        id: movieId,
        numOfViews: 1,
        dateLastViewed: Timestamp.fromDate(new Date()),
      })
        .then((doc) => {
          console.log(doc);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setDoc(
      doc(database, "pageStatistics", "views"),
      {
        numOfViewedMovies: increment(1),
      },
      { merge: true }
    )
      .then((doc) => {
        console.log(doc);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleStatistics();

    return () => {
      setShowBackgroundDarkener(false);
      setShowTrailerPopup(false);
      setShowImagesPopup(false);
    };
  }, []);

  return (
    <>
      {/* Body Background Image */}
      <div className={reusableStyles.backgroundImageContainer}>
        <Image
          src={`${baseImageURL}${movieResults?.details?.backdrop_path}`}
          alt={
            movieResults?.details?.name ||
            movieResults?.details?.title ||
            movieResults?.details?.original_title
          }
          layout="fill"
          className={reusableStyles.backgroundImage}
        />
      </div>

      {/* Background Darkener */}
      <div
        className={`${showBackgroundDarkener && reusableStyles.show} ${reusableStyles.backgroundDarkener}`}
      ></div>

      {/* Trailer Popup */}
      <section className={`${showTrailerPopup && reusableStyles.show} ${reusableStyles.trailerPopup}`}>
        {movieResults?.videos?.results?.filter(
          (video) =>
            video?.name?.toLowerCase().match(/"official"|"trailer"/) ||
            video?.name?.toLowerCase().includes("final trailer") ||
            video?.name?.toLowerCase().includes("main trailer") ||
            video?.name?.toLowerCase().includes("trailer")
        ) ? (
          <iframe
            className={reusableStyles.trailerVideo}
            src={`https://www.youtube.com/embed/${
              movieResults?.videos?.results?.filter(
                (video) =>
                  video?.name?.toLowerCase().match(/"official"|"trailer"/) ||
                  video?.name?.toLowerCase().includes("final trailer") ||
                  video?.name?.toLowerCase().includes("main trailer") ||
                  video?.name?.toLowerCase().includes("trailer")
              )[0]?.key
            }`}
            title={`${
              movieResults?.details?.name ||
              movieResults?.details?.title ||
              movieResults?.details?.original_title
            } Official Trailer`}
            frameBorder="0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          "Sorry, there is no trailer for this movie at the moment"
        )}
      </section>

      {/* Movie Info Wrapper */}
      <section className={reusableStyles.infoWrapper}>
        <article className={`${reusableStyles.imageAndUserActionsContainer} ${reusableStyles.article}`}>
          <ImageAndUserActionsContainer
            styles={reusableStyles}
            id={movieId}
            fromPage="movie"
            results={movieResults}
          />
        </article>

        {/* Main Info */}
        <article className={`${reusableStyles.mainInfoWrapper} ${reusableStyles.article}`}>
          <div className={reusableStyles.mainInfoContent}>
            <h1 className={reusableStyles.mainInfoTitle}>
              {movieResults?.details?.name ||
                movieResults?.details?.title ||
                movieResults?.details?.original_title}
            </h1>

            <div className={reusableStyles.mainInfoSectionContainer}>
              <h2 className={reusableStyles.mainInfoSectionTitle}>GENRE</h2>
              <p className={reusableStyles.genres}>
                {movieResults?.details?.genres.map((genre) => genre?.name).join(" / ")}
              </p>
            </div>

            <div className={reusableStyles.mainInfoSectionContainer}>
              <h2 className={reusableStyles.mainInfoSectionTitle}>TAGLINE</h2>
              <p className={reusableStyles.tagline}>
                {movieResults?.details?.tagline ? movieResults?.details?.tagline : "N/A"}
              </p>
            </div>

            <div className={reusableStyles.mainInfoSectionContainer}>
              <h2 className={reusableStyles.mainInfoSectionTitle}>OVERVIEW</h2>
              <p className={reusableStyles.movieOverview}>{movieResults?.details?.overview}</p>
            </div>
          </div>

          <aside className={reusableStyles.mainInfoAside}>
            <span className={reusableStyles.mainInfoDuration}>
              <FiClock className={reusableStyles.mainInfoDurationIcon} />
              <span id="durationContainer">{formatDuration(movieDuration)}</span>
            </span>
            <span className={reusableStyles.mainInfoAvgVote}>
              {movieResults?.details?.vote_average ? movieResults?.details?.vote_average : "N/A"}
              <BsStarFill className={reusableStyles.mainInfoAvgVoteIcon} />
              <br />
              <span className={reusableStyles.mainInfoVoteCount}>
                <span className={reusableStyles.mainInfoVoteCountNumber}>
                  {movieResults?.details?.vote_count ? `${movieResults?.details?.vote_count} ` : "No "}
                </span>
                votes
              </span>
            </span>
            <span className={reusableStyles.mainInfoReleaseDate}>
              <BsCalendar3 className={reusableStyles.mainInfoReleaseDateIcon} />
              {moment(movieResults?.details?.release_date).format("Do MMMM YYYY")}
            </span>

            <button
              type="button"
              className={reusableStyles.playTrailerButton}
              onClick={() => {
                const trailerPopup = document.querySelector(`.${reusableStyles.trailerPopup}`);
                setShowBackgroundDarkener(true);
                setShowTrailerPopup(true);

                trailerPopup.addEventListener("click", (e) => {
                  e.preventDefault();

                  const trailerVideo = document.querySelector(`.${reusableStyles.trailerVideo}`);
                  let trailerVideoSrc = trailerVideo.src;
                  trailerVideo.src = trailerVideoSrc;

                  setShowBackgroundDarkener(false);
                  setShowTrailerPopup(false);

                  trailerPopup.removeEventListener("click", null);
                });
              }}
            >
              <BsPlayFill className={reusableStyles.playTrailerButtonIcon} />
              Play Trailer
            </button>
          </aside>
        </article>

        <div className={reusableStyles.castWatchKeywordsWrapper}>
          {/* Cast & Crew */}
          <article className={`${reusableStyles.castAndCrewWrapper} ${reusableStyles.article}`}>
            <h1 className={reusableStyles.articleTitle}>Cast & Crew</h1>

            <CastAndCrewRow styles={reusableStyles} title="Characters" results={movieResults} />
            <CastAndCrewRow styles={reusableStyles} title="Producers" results={movieResults} />
            <CastAndCrewRow styles={reusableStyles} title="Screenplay" results={movieResults} />
          </article>

          {/* Where To Watch */}
          <article className={`${reusableStyles.whereToWatchWrapper} ${reusableStyles.article}`}>
            <h1 className={reusableStyles.smallArticleTitle}>Where to Watch</h1>

            <WhereToWatchRow styles={reusableStyles} title="Buy" results={movieResults} />
            <WhereToWatchRow styles={reusableStyles} title="Rent" results={movieResults} />
            <WhereToWatchRow styles={reusableStyles} title="Streaming on" results={movieResults} />
          </article>

          {/* Keywords */}
          <article className={`${reusableStyles.keywordsWrapper} ${reusableStyles.article}`}>
            <h1 className={reusableStyles.smallArticleTitle}>Keywords</h1>

            <KeywordsContainer styles={reusableStyles} type="movie" results={movieResults} />
          </article>
        </div>

        {/* Images */}
        <article className={`${reusableStyles.imagesWrapper} ${reusableStyles.article}`}>
          <h1 className={reusableStyles.articleTitle}>Images</h1>

          <ImagesRow styles={reusableStyles} results={movieResults} />
        </article>

        {/* Related Movies */}
        <article className={`${reusableStyles.relatedWrapper} ${reusableStyles.article}`}>
          <h1 className={reusableStyles.articleTitle}>Related Movies</h1>

          <SimilarRow styles={reusableStyles} type="movie" results={movieResults} />
        </article>

        {/* Reviews */}
        <article className={reusableStyles.commentsAndReviewFormWrapper}>
          <div className={`${reusableStyles.commentsWrapper} ${reusableStyles.article}`}>
            <h1 className={reusableStyles.articleTitle}>User Reviews</h1>

            <CommentsContainer styles={reusableStyles} fromPage="movie" id={movieId} results={movieResults} />
          </div>

          <div className={`${reusableStyles.reviewFormWrapper} ${reusableStyles.article}`}>
            <h1 className={reusableStyles.articleTitle}>Share your thoughts</h1>

            <ReviewForm styles={reusableStyles} fromPage="movie" id={movieId} />
          </div>
        </article>
      </section>
    </>
  );
}

export default MovieInfo;
