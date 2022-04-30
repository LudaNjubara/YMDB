import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import uniqid from "uniqid";
import { truncate, baseImageURL } from "../Home/Row";
import { BsStarFill, BsBookmarkFill, BsCalendar3, BsPlayFill } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import styles from "../../styles/Serie/serieInfo.module.css";

function SerieInfo({ serieResults }) {
  const [showBackgroundDarkener, setShowBackgroundDarkener] = useState(false);
  const [showTrailerPopup, setShowTrailerPopup] = useState(false);
  const [showImagesPopup, setShowImagesPopup] = useState(false);
  const duration = serieResults?.serieDetails?.episode_run_time[0];

  function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const durationString = hours ? `${hours}h ${minutes}min` : `${minutes}min`;
    return durationString;
  }

  function randomImageGenerator() {
    let images = [];
    let randomImages = [];

    if (serieResults?.serieImages?.backdrops) images = images.concat(serieResults?.serieImages?.backdrops);

    if (serieResults?.serieImages?.posters) images = images.concat(serieResults?.serieImages?.posters);

    if (images.length >= 20) {
      for (let i = 0; i < 20; i++) {
        let randomImage = images[Math.floor(Math.random() * images.length)];
        randomImages.push(randomImage);
      }
    } else {
      for (let i = 0; i < images.length; i++) {
        let randomImage = images[Math.floor(Math.random() * images.length)];
        randomImages.push(randomImage);
      }
    }

    return randomImages;
  }

  return (
    <>
      {/* Body Background Image */}
      <div className={styles.backgroundImageContainer}>
        <Image
          src={`${baseImageURL}${serieResults?.serieDetails?.backdrop_path}`}
          alt={serieResults?.serieDetails?.name || serieResults?.serieDetails?.original_name}
          layout="fill"
          className={styles.backgroundImage}
        />
      </div>

      {/* Background Darkener */}
      <div className={`${showBackgroundDarkener && styles.show} ${styles.backgroundDarkener}`}></div>

      {/* Trailer Popup */}
      <section className={`${showTrailerPopup && styles.show} ${styles.serieTrailerPopup}`}>
        {serieResults?.serieVideos?.results?.filter((video) =>
          video?.name?.toLowerCase().includes("official trailer")
        ) ? (
          <iframe
            className={styles.serieTrailerVideo}
            src={`https://www.youtube.com/embed/${
              serieResults?.serieVideos?.results?.filter((video) =>
                video?.name?.toLowerCase().includes("official trailer")
              )[0]?.key
            }`}
            title={`${
              serieResults?.serieDetails?.name || serieResults?.serieDetails?.original_name
            } Official Trailer`}
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
      <section className={styles.serieInfoWrapper}>
        <article className={`${styles.serieImageAndUserActionsContainer} ${styles.serieArticle}`}>
          <Image
            src={`${baseImageURL}${serieResults?.serieDetails?.poster_path}`}
            alt={serieResults?.serieDetails?.name || serieResults?.serieDetails?.original_name}
            layout="fill"
            className={styles.serieImage}
            priority="true"
          />
          <div className={styles.userActionsContainer}>
            <button type="button" className={styles.userActionButton}>
              <BsBookmarkFill className={styles.userActionIcon} />
              Add to Watchlist
            </button>
            <button type="button" className={styles.userActionButton}>
              <BsStarFill className={styles.userActionIcon} />
              Add to Favourites
            </button>
          </div>
        </article>

        {/* Main Info */}
        <article className={`${styles.serieMainInfoContainer} ${styles.serieArticle}`}>
          <div className={styles.serieMainInfoContent}>
            <h1 className={styles.serieMainInfoTitle}>
              {serieResults?.serieDetails?.name || serieResults?.serieDetails?.original_name}
            </h1>

            <div className={styles.serieMainInfoSectionContainer}>
              <h2 className={styles.serieMainInfoSectionTitle}>GENRE</h2>
              <p className={styles.serieGenres}>
                {serieResults?.serieDetails?.genres.map((genre) => genre?.name).join(" / ")}
              </p>
            </div>

            <div className={styles.serieMainInfoSectionContainer}>
              <h2 className={styles.serieMainInfoSectionTitle}>TAGLINE</h2>
              <p className={styles.serieTagline}>
                {serieResults?.serieDetails?.tagline ? serieResults?.serieDetails?.tagline : "N/A"}
              </p>
            </div>

            <div className={styles.serieMainInfoSectionContainer}>
              <h2 className={styles.serieMainInfoSectionTitle}>OVERVIEW</h2>
              <p className={styles.serieOverview}>{serieResults?.serieDetails?.overview}</p>
            </div>
          </div>

          <aside className={styles.serieMainInfoAside}>
            <div className={styles.serieMainInfoDuration}>
              <FiClock className={styles.serieMainInfoDurationIcon} />
              <span className={styles.durationContainer}>{formatDuration(duration)}</span>
            </div>
            <span className={styles.serieMainInfoAvgVote}>
              {serieResults?.serieDetails?.vote_average ? serieResults?.serieDetails?.vote_average : "N/A"}
              <BsStarFill className={styles.serieMainInfoAvgVoteIcon} />
              <br />
              <span className={styles.serieMainInfoVoteCount}>
                <span className={styles.serieMainInfoVoteCountNumber}>
                  {serieResults?.serieDetails?.vote_count
                    ? `${serieResults?.serieDetails?.vote_count} `
                    : "No "}
                </span>
                votes
              </span>
            </span>
            <span className={styles.serieMainInfoReleaseDate}>
              <BsCalendar3 className={styles.serieMainInfoReleaseDateIcon} />
              {moment(serieResults?.serieDetails?.first_air_date).format("Do MMMM YYYY")}
            </span>

            <button
              type="button"
              className={styles.playTrailerButton}
              onClick={() => {
                const trailerPopup = document.querySelector(`.${styles.serieTrailerPopup}`);
                setShowBackgroundDarkener(true);
                setShowTrailerPopup(true);

                trailerPopup.addEventListener("click", (e) => {
                  e.preventDefault();

                  const serieTrailerVideo = document.querySelector(`.${styles.serieTrailerVideo}`);
                  let serieTrailerVideoSrc = serieTrailerVideo.src;
                  serieTrailerVideo.src = serieTrailerVideoSrc;

                  setShowBackgroundDarkener(false);
                  setShowTrailerPopup(false);

                  trailerPopup.removeEventListener("click", null);
                });
              }}
            >
              <BsPlayFill className={styles.playTrailerButtonIcon} />
              Play Trailer
            </button>
          </aside>
        </article>

        <div className={styles.serieCastWatchKeywordsContainer}>
          {/* Cast & Crew */}
          <article className={`${styles.serieCastAndCrewContainer} ${styles.serieArticle}`}>
            <h1 className={styles.serieArticleTitle}>Cast & Crew</h1>

            <div className={styles.castAndCrewRow}>
              <h2 className={styles.castAndCrewRowTitle}>Characters</h2>

              <div className={styles.castAndCrewScrollableRow}>
                {serieResults?.serieCredits?.cast.map((castMember, index) => {
                  return index < 20 ? (
                    <div className={styles.castAndCrewCard} key={uniqid()}>
                      <div className={styles.castAndCrewImageContainer}>
                        <Image
                          src={`${baseImageURL}${castMember?.profile_path}`}
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII="
                          alt={castMember?.name}
                          width={150}
                          height={200}
                          className={styles.memberImage}
                        />
                      </div>
                      <h3 className={styles.memberName}>{castMember?.name}</h3>
                      <h4 className={styles.memberCharacterName}>{castMember.character}</h4>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            <div className={styles.castAndCrewRow}>
              <h2 className={styles.castAndCrewRowTitle}>Producers</h2>

              <div className={styles.castAndCrewScrollableRow}>
                {serieResults?.serieCredits?.crew
                  .filter((crewMember) => {
                    return crewMember?.job === "Executive Producer";
                  })
                  .map((crewMember) => {
                    return (
                      <div className={styles.castAndCrewCard} key={uniqid()}>
                        <div className={styles.castAndCrewImageContainer}>
                          <Image
                            src={`${baseImageURL}${crewMember?.profile_path}`}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII="
                            alt={crewMember?.name}
                            width={150}
                            height={200}
                            className={styles.memberImage}
                          />
                        </div>
                        <h3 className={styles.memberName}>{crewMember?.name}</h3>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className={styles.castAndCrewRow}>
              <h2 className={styles.castAndCrewRowTitle}>Writers</h2>

              <div className={styles.castAndCrewScrollableRow}>
                {serieResults?.serieCredits?.crew
                  .filter((crewMember) => {
                    return (
                      crewMember?.job === "Original Series Creator" ||
                      crewMember?.known_for_department === "Writing"
                    );
                  })
                  .map((crewMember) => {
                    return (
                      <div className={styles.castAndCrewCard} key={uniqid()}>
                        <div className={styles.castAndCrewImageContainer}>
                          <Image
                            src={`${baseImageURL}${crewMember?.profile_path}`}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII="
                            alt={crewMember?.name}
                            width={150}
                            height={200}
                            className={styles.memberImage}
                          />
                        </div>
                        <h3 className={styles.memberName}>{crewMember?.name}</h3>
                      </div>
                    );
                  })}
              </div>
            </div>
          </article>

          {/* Where To Watch */}
          <article className={`${styles.serieWhereToWatchContainer} ${styles.serieArticle}`}>
            <h1 className={styles.serieSmallArticleTitle}>Where to Watch</h1>

            <div className={styles.whereToWatchRow}>
              <h2 className={styles.whereToWatchRowTitle}>Buy</h2>

              <div className={styles.whereToWatchScrollableRow}>
                {serieResults?.serieWatchProviders?.US?.buy
                  ? serieResults?.serieWatchProviders?.US?.buy.map((provider) => {
                      return (
                        <div className={styles.whereToWatchImageContainer} key={uniqid()}>
                          <Image
                            src={`${baseImageURL}${provider?.logo_path}`}
                            layout="fill"
                            className={styles.whereToWatchProviderImage}
                          />
                        </div>
                      );
                    })
                  : "Unavailable"}
              </div>
            </div>

            <div className={styles.whereToWatchRow}>
              <h2 className={styles.whereToWatchRowTitle}>Rent</h2>

              <div className={styles.whereToWatchScrollableRow}>
                {serieResults?.serieWatchProviders?.US?.rent
                  ? serieResults?.serieWatchProviders?.US?.rent.map((provider) => {
                      return (
                        <div className={styles.whereToWatchImageContainer} key={uniqid()}>
                          <Image
                            src={`${baseImageURL}${provider?.logo_path}`}
                            layout="fill"
                            className={styles.whereToWatchProviderImage}
                          />
                        </div>
                      );
                    })
                  : "Unavailable"}
              </div>
            </div>

            <div className={styles.whereToWatchRow}>
              <h2 className={styles.whereToWatchRowTitle}>Streaming on</h2>

              <div className={styles.whereToWatchScrollableRow}>
                {serieResults?.serieWatchProviders?.US?.flatrate
                  ? serieResults?.serieWatchProviders?.US?.flatrate.map((provider) => {
                      return (
                        <div className={styles.whereToWatchImageContainer} key={uniqid()}>
                          <Image
                            src={`${baseImageURL}${provider?.logo_path}`}
                            layout="fill"
                            className={styles.whereToWatchProviderImage}
                          />
                        </div>
                      );
                    })
                  : "Unavailable"}
              </div>
            </div>
          </article>

          {/* Keywords */}
          <article className={`${styles.serieKeywordsContainer} ${styles.serieArticle}`}>
            <h1 className={styles.serieSmallArticleTitle}>Keywords</h1>

            <div className={styles.keywordsContainer}>
              {serieResults?.serieKeywords?.results.map((keyword) => {
                return (
                  <span className={styles.keyword} key={uniqid()}>
                    {keyword?.name}
                  </span>
                );
              })}
            </div>
          </article>
        </div>

        {/* Images */}
        <article className={`${styles.serieImagesContainer} ${styles.serieArticle}`}>
          <h1 className={styles.serieArticleTitle}>Images</h1>

          <div className={styles.imagesScrollableRow}>
            {randomImageGenerator().map((image) => {
              return image.aspect_ratio < 1 ? (
                <div className={styles.imageContainerVertical} key={uniqid()}>
                  <Image
                    src={`${baseImageURL}${image.file_path}`}
                    layout="fill"
                    className={styles.whereToWatchProviderImage}
                  />
                </div>
              ) : (
                <div className={styles.imageContainerHorizontal} key={uniqid()}>
                  <Image
                    src={`${baseImageURL}${image.file_path}`}
                    layout="fill"
                    className={styles.whereToWatchProviderImage}
                  />
                </div>
              );
            })}
          </div>
        </article>

        {/* Related Series */}
        <article className={`${styles.serieRelatedSeriesContainer} ${styles.serieArticle}`}>
          <h1 className={styles.serieArticleTitle}>Related Series</h1>

          <div className={styles.relatedSeriesScrollableRow}>
            {serieResults?.serieSimilar?.results.map(
              (serie) =>
                serie?.backdrop_path && (
                  <Link href={`/series/${encodeURIComponent(serie?.id)}`} key={uniqid()}>
                    <article className={styles.relatedSerieContainer} tabIndex="0">
                      <div className={styles.relatedSerieImageContainer}>
                        <Image
                          src={`${baseImageURL}${serie?.backdrop_path}`}
                          alt={serie?.name}
                          className={styles.relatedSerieImage}
                          layout="fill"
                        />
                      </div>
                      <div className={styles.relatedSerieContent}>
                        <div className={styles.relatedSerieTitleAndVoteAvg}>
                          <h3 className={styles.relatedSerieTitle}>{serie?.name || serie?.original_name}</h3>
                          <div className={styles.serieVoteContainer}>
                            <span className={styles.relatedSerieVoteAvg}>
                              {serie?.vote_average ? serie?.vote_average.toFixed(1) : "N/A"}
                            </span>
                            <FaStar className={styles.relatedSerieVoteIcon} />
                          </div>
                        </div>
                        <p className={styles.relatedSerieDescription}>{truncate(serie?.overview)}</p>
                      </div>
                    </article>
                  </Link>
                )
            )}
          </div>
        </article>

        {/* Reviews */}
        <article className={styles.serieReviewsContainer}>
          <div className={`${styles.reviewsContainer} ${styles.serieArticle}`}>
            <h1 className={styles.serieArticleTitle}>User Reviews</h1>

            <div className={styles.commentsContainer}>
              {serieResults?.serieReviews?.results.map((review) => {
                return (
                  <div className={styles.commentContainer} key={uniqid()}>
                    <div className={styles.commentInfoContainer}>
                      <div className={styles.userInfoContainer}>
                        <div className={styles.userImageContainer}>
                          <img
                            src={
                              review?.author_details?.avatar_path?.includes("gravatar")
                                ? review?.author_details?.avatar_path?.substring(1)
                                : !review?.author_details?.avatar_path?.includes("gravatar") &&
                                  review?.author_details?.avatar_path !== null
                                ? `${baseImageURL}${review?.author_details?.avatar_path}`
                                : "/defaultUser.png"
                            }
                            alt="Avatar"
                            className={styles.userImage}
                            width={50}
                            height={50}
                          />
                        </div>
                        <h3 className={styles.userUsername}>{review?.author_details?.username}</h3>
                        <p className={styles.commentDate}>{`Created at ${review?.created_at}`}</p>
                      </div>

                      <div className={styles.userVoteContainer}>
                        {review?.author_details?.rating ? review?.author_details?.rating : "N/A"}
                        <BsStarFill className={styles.serieCommentAvgVoteIcon} />
                      </div>
                    </div>

                    <p className={styles.userComment}>{truncate(review?.content, 500)}</p>

                    <button type="button" className={styles.expandShrinkCommentButton}>
                      Expand Comment
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`${styles.reviewFormContainer} ${styles.serieArticle}`}>
            <h1 className={styles.serieArticleTitle}>Share your thoughts</h1>

            <form className={styles.reviewForm}>
              <textarea
                className={styles.userCommentInput}
                placeholder="Here you can express your thoughts on the serie..."
                spellCheck="false"
                required={true}
              ></textarea>

              <div className={styles.userRatingContainer}>
                <h2 className={styles.serieSmallArticleTitle}>Your rating</h2>

                <div className={styles.ratingsContainer}>
                  <input
                    type="radio"
                    id="ratingButton1"
                    name="ratingButton"
                    value="1"
                    className={styles.ratingButton}
                  />
                  <label htmlFor="ratingButton1" className={styles.userRatingLabel}>
                    1
                    <FaStar className={styles.ratingButtonIcon} />
                  </label>
                  <input
                    type="radio"
                    id="ratingButton2"
                    name="ratingButton"
                    value="2"
                    className={styles.ratingButton}
                  />
                  <label htmlFor="ratingButton2" className={styles.userRatingLabel}>
                    2
                    <FaStar className={styles.ratingButtonIcon} />
                  </label>
                  <input
                    type="radio"
                    id="ratingButton3"
                    name="ratingButton"
                    value="3"
                    className={styles.ratingButton}
                  />
                  <label htmlFor="ratingButton3" className={styles.userRatingLabel}>
                    3
                    <FaStar className={styles.ratingButtonIcon} />
                  </label>

                  <input
                    type="radio"
                    id="radioButton4"
                    name="ratingButton"
                    value="4"
                    className={styles.ratingButton}
                  />
                  <label htmlFor="radioButton4" className={styles.userRatingLabel}>
                    4
                    <FaStar className={styles.ratingButtonIcon} />
                  </label>

                  <input
                    type="radio"
                    id="radioButton5"
                    name="ratingButton"
                    value="5"
                    className={styles.ratingButton}
                  />
                  <label htmlFor="radioButton5" className={styles.userRatingLabel}>
                    5
                    <FaStar className={styles.ratingButtonIcon} />
                  </label>

                  <input
                    type="radio"
                    id="radioButton6"
                    name="ratingButton"
                    value="6"
                    className={styles.ratingButton}
                  />
                  <label htmlFor="radioButton6" className={styles.userRatingLabel}>
                    6
                    <FaStar className={styles.ratingButtonIcon} />
                  </label>

                  <input
                    type="radio"
                    id="radioButton7"
                    name="ratingButton"
                    value="7"
                    className={styles.ratingButton}
                  />
                  <label htmlFor="radioButton7" className={styles.userRatingLabel}>
                    7
                    <FaStar className={styles.ratingButtonIcon} />
                  </label>

                  <input
                    type="radio"
                    id="radioButton8"
                    name="ratingButton"
                    value="8"
                    className={styles.ratingButton}
                  />
                  <label htmlFor="radioButton8" className={styles.userRatingLabel}>
                    8
                    <FaStar className={styles.ratingButtonIcon} />
                  </label>

                  <input
                    type="radio"
                    id="radioButton9"
                    name="ratingButton"
                    value="9"
                    className={styles.ratingButton}
                  />
                  <label htmlFor="radioButton9" className={styles.userRatingLabel}>
                    9
                    <FaStar className={styles.ratingButtonIcon} />
                  </label>

                  <input
                    type="radio"
                    id="radioButton10"
                    name="ratingButton"
                    value="10"
                    className={styles.ratingButton}
                  />
                  <label htmlFor="radioButton10" className={styles.userRatingLabel}>
                    10
                    <FaStar className={styles.ratingButtonIcon} />
                  </label>

                  <input
                    type="radio"
                    id="radioButtonCustom"
                    name="ratingButton"
                    className={styles.ratingButton}
                  />
                  <label htmlFor="radioButtonCustom" className={styles.userRatingLabel}>
                    Custom
                    <input
                      type="number"
                      min={1}
                      max={10}
                      maxLength="2"
                      step=".1"
                      name="customRating"
                      className={styles.customRatingInput}
                    />
                    <FaStar className={styles.ratingButtonIcon} />
                  </label>
                </div>
              </div>

              <div className={styles.formPostClearButtonContainer}>
                <button type="submit" className={styles.formPostClearButton}>
                  Post
                </button>
                <button type="reset" className={styles.formPostClearButton}>
                  Clear form
                </button>
              </div>
            </form>
          </div>

          <div className={styles.relatedSeriesScrollableRow}></div>
        </article>
      </section>
    </>
  );
}

export default SerieInfo;
