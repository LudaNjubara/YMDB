import { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { database } from "../firebase";
import { getDoc, updateDoc, doc, setDoc, increment, Timestamp } from "firebase/firestore";
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

function SerieInfo({ serieResults, serieId }) {
  const [showBackgroundDarkener, setShowBackgroundDarkener] = useState(false);
  const [showTrailerPopup, setShowTrailerPopup] = useState(false);
  const [showImagesPopup, setShowImagesPopup] = useState(false);
  const duration = serieResults?.details?.episode_run_time[0];

  async function handleStatistics() {
    const docSnap = await getDoc(doc(database, "pageStatistics/seriesData/allViewedSeries", serieId));

    if (docSnap.exists()) {
      updateDoc(doc(database, `pageStatistics/seriesData/allViewedSeries/${serieId}`), {
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
      setDoc(doc(database, `pageStatistics/seriesData/allViewedSeries/${serieId}`), {
        id: serieId,
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
        numOfViewedSeries: increment(1),
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
          src={`${baseImageURL}${serieResults?.details?.backdrop_path}`}
          alt={serieResults?.details?.name || serieResults?.details?.original_name}
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
        {serieResults?.videos?.results?.filter(
          (video) =>
            video?.name?.toLowerCase().match(/"official"|"trailer"/) ||
            video?.name?.toLowerCase().includes("final trailer") ||
            video?.name?.toLowerCase().includes("main trailer") ||
            video?.name?.toLowerCase().includes("trailer")
        ) ? (
          <iframe
            className={reusableStyles.trailerVideo}
            src={`https://www.youtube.com/embed/${
              serieResults?.videos?.results?.filter(
                (video) =>
                  video?.name?.toLowerCase().match(/"official"|"trailer"/) ||
                  video?.name?.toLowerCase().includes("final trailer") ||
                  video?.name?.toLowerCase().includes("main trailer") ||
                  video?.name?.toLowerCase().includes("trailer")
              )[0]?.key
            }`}
            title={`${serieResults?.details?.name || serieResults?.details?.original_name} Official Trailer`}
            frameBorder="0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          "Sorry, there is no trailer for this serie at the moment"
        )}
      </section>

      {/* Serie Info Wrapper */}
      <section className={reusableStyles.infoWrapper}>
        <article className={`${reusableStyles.imageAndUserActionsContainer} ${reusableStyles.article}`}>
          <ImageAndUserActionsContainer
            styles={reusableStyles}
            fromPage="serie"
            id={serieId}
            results={serieResults}
          />
        </article>

        {/* Main Info */}
        <article className={`${reusableStyles.mainInfoWrapper} ${reusableStyles.article}`}>
          <div className={reusableStyles.mainInfoContent}>
            <h1 className={reusableStyles.mainInfoTitle}>
              {serieResults?.details?.name || serieResults?.details?.original_name}
            </h1>

            <div className={reusableStyles.mainInfoSectionContainer}>
              <h2 className={reusableStyles.mainInfoSectionTitle}>GENRE</h2>
              <p className={reusableStyles.genres}>
                {serieResults?.details?.genres.map((genre) => genre?.name).join(" / ")}
              </p>
            </div>

            <div className={reusableStyles.mainInfoSectionContainer}>
              <h2 className={reusableStyles.mainInfoSectionTitle}>TAGLINE</h2>
              <p className={reusableStyles.serieTagline}>
                {serieResults?.details?.tagline ? serieResults?.details?.tagline : "N/A"}
              </p>
            </div>

            <div className={reusableStyles.mainInfoSectionContainer}>
              <h2 className={reusableStyles.mainInfoSectionTitle}>OVERVIEW</h2>
              <p className={reusableStyles.overview}>{serieResults?.details?.overview}</p>
            </div>
          </div>

          <aside className={reusableStyles.mainInfoAside}>
            <div className={reusableStyles.mainInfoDuration}>
              <FiClock className={reusableStyles.mainInfoDurationIcon} />
              <span className={reusableStyles.durationContainer}>{formatDuration(duration)}</span>
            </div>
            <span className={reusableStyles.mainInfoAvgVote}>
              {serieResults?.details?.vote_average ? serieResults?.details?.vote_average : "N/A"}
              <BsStarFill className={reusableStyles.mainInfoAvgVoteIcon} />
              <br />
              <span className={reusableStyles.mainInfoVoteCount}>
                <span className={reusableStyles.mainInfoVoteCountNumber}>
                  {serieResults?.details?.vote_count ? `${serieResults?.details?.vote_count} ` : "No "}
                </span>
                votes
              </span>
            </span>
            <span className={reusableStyles.mainInfoReleaseDate}>
              <BsCalendar3 className={reusableStyles.mainInfoReleaseDateIcon} />
              {moment(serieResults?.details?.first_air_date).format("Do MMMM YYYY")}
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

            <CastAndCrewRow styles={reusableStyles} title="Characters" results={serieResults} />
            <CastAndCrewRow styles={reusableStyles} title="Producers" results={serieResults} />
            <CastAndCrewRow styles={reusableStyles} title="Writers" results={serieResults} />
          </article>

          {/* Where To Watch */}
          <article className={`${reusableStyles.whereToWatchWrapper} ${reusableStyles.article}`}>
            <h1 className={reusableStyles.smallArticleTitle}>Where to Watch</h1>

            <WhereToWatchRow styles={reusableStyles} title="Buy" results={serieResults} />
            <WhereToWatchRow styles={reusableStyles} title="Rent" results={serieResults} />
            <WhereToWatchRow styles={reusableStyles} title="Streaming on" results={serieResults} />
          </article>

          {/* Keywords */}
          <article className={`${reusableStyles.keywordsWrapper} ${reusableStyles.article}`}>
            <h1 className={reusableStyles.smallArticleTitle}>Keywords</h1>

            <KeywordsContainer styles={reusableStyles} type="serie" results={serieResults} />
          </article>
        </div>

        {/* Images */}
        <article className={`${reusableStyles.imagesWrapper} ${reusableStyles.article}`}>
          <h1 className={reusableStyles.articleTitle}>Images</h1>

          <ImagesRow styles={reusableStyles} results={serieResults} />
        </article>

        {/* Related Series */}
        <article className={`${reusableStyles.relatedWrapper} ${reusableStyles.article}`}>
          <h1 className={reusableStyles.articleTitle}>Related Series</h1>

          <SimilarRow styles={reusableStyles} type="serie" results={serieResults} />
        </article>

        {/* Reviews */}
        <article className={reusableStyles.commentsAndReviewFormWrapper}>
          <div className={`${reusableStyles.commentsWrapper} ${reusableStyles.article}`}>
            <h1 className={reusableStyles.articleTitle}>User Reviews</h1>

            <CommentsContainer styles={reusableStyles} fromPage="serie" id={serieId} results={serieResults} />
          </div>

          <div className={`${reusableStyles.reviewFormWrapper} ${reusableStyles.article}`}>
            <h1 className={reusableStyles.articleTitle}>Share your thoughts</h1>

            <ReviewForm styles={reusableStyles} fromPage="serie" id={serieId} />
          </div>
        </article>
      </section>
    </>
  );
}

export default SerieInfo;
