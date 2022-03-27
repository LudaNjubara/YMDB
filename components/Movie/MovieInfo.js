import styles from "../../styles/Movie/movieInfo.module.css";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { truncate, baseImageURL } from "../Home/Row";
import { BsStarFill, BsBookmarkFill, BsCalendar3, BsPlayFill } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

function MovieInfo({ movieResults }) {
  const movieDuration = movieResults?.movieDetails?.runtime;

  function formatDuration(duration) {
    const durationContainer = document.querySelector("#durationContainer");
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const durationString = `${hours}h ${minutes}min`;
    durationContainer?.innerHTML = durationString;
  }

  return (
    <>
      {/* Body Background Image */}
      <div className={styles.backgroundImageContainer}>
        <Image
          src={`${baseImageURL}${movieResults?.movieDetails?.backdrop_path}`}
          alt={
            movieResults?.movieDetails?.name ||
            movieResults?.movieDetails?.title ||
            movieResults?.movieDetails?.original_title
          }
          layout="fill"
          className={styles.backgroundImage}
        />
      </div>

      {/* Movie Info Wrapper */}
      <section className={styles.movieInfoWrapper}>
        <article className={`${styles.movieImageAndUserActionsContainer} ${styles.movieArticle}`}>
          <Image
            src={`${baseImageURL}${movieResults?.movieDetails?.poster_path}`}
            alt={
              movieResults?.movieDetails?.name ||
              movieResults?.movieDetails?.title ||
              movieResults?.movieDetails?.original_title
            }
            layout="fill"
            className={styles.movieImage}
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
        <article className={`${styles.movieMainInfoContainer} ${styles.movieArticle}`}>
          <div className={styles.movieMainInfoContent}>
            <h1 className={styles.movieMainInfoTitle}>
              {movieResults?.movieDetails?.name ||
                movieResults?.movieDetails?.title ||
                movieResults?.movieDetails?.original_title}
            </h1>

            <div className={styles.movieMainInfoSectionContainer}>
              <h2 className={styles.movieMainInfoSectionTitle}>GENRE</h2>
              <p className={styles.movieGenres}>
                {movieResults?.movieDetails?.genres.map((genre, index, genresArray) => {
                  return index !== genresArray.length - 1 ? `${genre?.name} / ` : genre?.name;
                })}
              </p>
            </div>

            <div className={styles.movieMainInfoSectionContainer}>
              <h2 className={styles.movieMainInfoSectionTitle}>TAGLINE</h2>
              <p className={styles.movieTagline}>{movieResults?.movieDetails?.tagline}</p>
            </div>

            <div className={styles.movieMainInfoSectionContainer}>
              <h2 className={styles.movieMainInfoSectionTitle}>OVERVIEW</h2>
              <p className={styles.movieOverview}>{movieResults?.movieDetails?.overview}</p>
            </div>
          </div>

          <aside className={styles.movieMainInfoAside}>
            <span className={styles.movieMainInfoDuration}>
              <FiClock className={styles.movieMainInfoDurationIcon} />
              <span id="durationContainer">{formatDuration(movieDuration)}</span>
            </span>
            <span className={styles.movieMainInfoAvgVote}>
              {movieResults?.movieDetails?.vote_average ? movieResults?.movieDetails?.vote_average : "N/A"}
              <BsStarFill className={styles.movieMainInfoAvgVoteIcon} />
              <br />
              <span className={styles.movieMainInfoVoteCount}>
                <span className={styles.movieMainInfoVoteCountNumber}>
                  {movieResults?.movieDetails?.vote_count
                    ? `${movieResults?.movieDetails?.vote_count} `
                    : "No "}
                </span>
                votes
              </span>
            </span>
            <span className={styles.movieMainInfoReleaseDate}>
              <BsCalendar3 className={styles.movieMainInfoReleaseDateIcon} />
              {moment(movieResults?.movieDetails?.release_date).format("Do MMMM YYYY")}
            </span>

            <button type="button" className={styles.playTrailerButton}>
              <BsPlayFill className={styles.playTrailerButtonIcon} />
              Play Trailer
            </button>
          </aside>
        </article>

        <div className={styles.movieCastWatchKeywordsContainer}>
          {/* Cast & Crew */}
          <article className={`${styles.movieCastAndCrewContainer} ${styles.movieArticle}`}>
            <h1 className={styles.movieArticleTitle}>Cast & Crew</h1>

            <div className={styles.castAndCrewRow}>
              <h2 className={styles.castAndCrewRowTitle}>Characters</h2>

              <div className={styles.castAndCrewScrollableRow}>
                {movieResults?.movieCredits?.cast.map((castMember, index) => {
                  return index < 20 ? (
                    <div className={styles.castAndCrewCard} key={castMember?.id}>
                      <Image
                        src={`${baseImageURL}${castMember?.profile_path}`}
                        alt={castMember?.name}
                        width={150}
                        height={200}
                        className={styles.memberImage}
                      />

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
                {movieResults?.movieCredits?.crew
                  .filter((crewMember) => {
                    return crewMember?.job === "Producer";
                  })
                  .map((crewMember) => {
                    return (
                      <div className={styles.castAndCrewCard} key={crewMember?.id}>
                        <Image
                          src={`${baseImageURL}${crewMember?.profile_path}`}
                          alt={crewMember?.name}
                          width={150}
                          height={200}
                          className={styles.memberImage}
                        />
                        <h3 className={styles.memberName}>{crewMember?.name}</h3>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className={styles.castAndCrewRow}>
              <h2 className={styles.castAndCrewRowTitle}>Screenplay</h2>

              <div className={styles.castAndCrewScrollableRow}>
                {movieResults?.movieCredits?.crew
                  .filter((crewMember) => {
                    return crewMember?.job === "Screenplay" || crewMember?.job === "Writer";
                  })
                  .map((crewMember) => {
                    return (
                      <div className={styles.castAndCrewCard} key={crewMember?.id}>
                        <Image
                          src={`${baseImageURL}${crewMember?.profile_path}`}
                          alt={crewMember?.name}
                          width={150}
                          height={200}
                          className={styles.memberImage}
                        />
                        <h3 className={styles.memberName}>{crewMember?.name}</h3>
                      </div>
                    );
                  })}
              </div>
            </div>
          </article>

          {/* Where To Watch */}
          <article className={`${styles.movieWhereToWatchContainer} ${styles.movieArticle}`}>
            <h1 className={styles.movieSmallArticleTitle}>Where to Watch</h1>

            <div className={styles.whereToWatchRow}>
              <h2 className={styles.whereToWatchRowTitle}>Buy</h2>

              <div className={styles.whereToWatchScrollableRow}>
                {movieResults?.movieWatchProviders?.US?.buy
                  ? movieResults?.movieWatchProviders?.US?.buy.map((provider) => {
                      return (
                        <div className={styles.whereToWatchImageContainer} key={provider?.provider_id}>
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
                {movieResults?.movieWatchProviders?.US?.rent
                  ? movieResults?.movieWatchProviders?.US?.rent.map((provider) => {
                      return (
                        <div className={styles.whereToWatchImageContainer} key={provider?.provider_id}>
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
                {movieResults?.movieWatchProviders?.US?.flatrate
                  ? movieResults?.movieWatchProviders?.US?.flatrate.map((provider) => {
                      return (
                        <div className={styles.whereToWatchImageContainer} key={provider?.provider_id}>
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
          <article className={`${styles.movieKeywordsContainer} ${styles.movieArticle}`}>
            <h1 className={styles.movieSmallArticleTitle}>Keywords</h1>

            <div className={styles.keywordsContainer}>
              {movieResults?.movieKeywords?.keywords.map((keyword) => {
                return (
                  <span className={styles.keyword} key={keyword?.id}>
                    {keyword?.name}
                  </span>
                );
              })}
            </div>
          </article>
        </div>

        {/* Images */}
        <article className={`${styles.movieImagesContainer} ${styles.movieArticle}`}>
          <h1 className={styles.movieArticleTitle}>Images</h1>

          <div className={styles.imagesScrollableRow}>
            {movieResults?.movieImages?.backdrops.map((backdropImage, index) => {
              return index < 5 ? (
                <div className={styles.imageContainerHorizontal} key={backdropImage?.file_path}>
                  <Image
                    src={`${baseImageURL}${backdropImage?.file_path}`}
                    layout="fill"
                    className={styles.whereToWatchProviderImage}
                  />
                </div>
              ) : null;
            })}
          </div>
        </article>

        {/* Related Movies */}
        <article className={`${styles.movieRelatedMoviesContainer} ${styles.movieArticle}`}>
          <h1 className={styles.movieArticleTitle}>Related Movies</h1>

          <div className={styles.relatedMoviesScrollableRow}>
            {movieResults?.movieSimilar?.results.map(
              (movie) =>
                movie?.backdrop_path && (
                  <Link href={`/${encodeURIComponent(movie?.id)}`} key={movie?.id}>
                    <article className={styles.relatedMovieContainer} tabIndex="0">
                      <div className={styles.relatedMovieImageContainer}>
                        <Image
                          src={`${baseImageURL}${movie?.backdrop_path}`}
                          alt={movie?.name}
                          className={styles.relatedMovieImage}
                          layout="fill"
                        />
                      </div>
                      <div className={styles.relatedMovieContent}>
                        <div className={styles.relatedMovieTitleAndVoteAvg}>
                          <h3 className={styles.relatedMovieTitle}>
                            {movie?.name || movie?.title || movie?.original_title}
                          </h3>
                          <div className={styles.movieVoteContainer}>
                            <span className={styles.relatedMovieVoteAvg}>
                              {movie?.vote_average ? movie?.vote_average.toFixed(1) : "N/A"}
                            </span>
                            <FaStar className={styles.relatedMovieVoteIcon} />
                          </div>
                        </div>
                        <p className={styles.relatedMovieDescription}>{truncate(movie?.overview)}</p>
                      </div>
                    </article>
                  </Link>
                )
            )}
          </div>
        </article>

        {/* Reviews */}
        <article className={styles.movieReviewsContainer}>
          <div className={`${styles.reviewsContainer} ${styles.movieArticle}`}>
            <h1 className={styles.movieArticleTitle}>User Reviews</h1>

            <div className={styles.commentsContainer}>
              {movieResults?.movieReviews?.results.map((review) => {
                return (
                  <div className={styles.commentContainer} key={review?.id}>
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
                        <BsStarFill className={styles.movieCommentAvgVoteIcon} />
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

          <div className={`${styles.reviewFormContainer} ${styles.movieArticle}`}>
            <h1 className={styles.movieArticleTitle}>Share your thoughts</h1>

            <form className={styles.reviewForm}>
              <textarea
                className={styles.userCommentInput}
                placeholder="Here you can express your thoughts on the movie..."
                spellCheck="false"
                required={true}
              ></textarea>

              <div className={styles.userRatingContainer}>
                <h2 className={styles.movieSmallArticleTitle}>Your rating</h2>

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

          <div className={styles.relatedMoviesScrollableRow}></div>
        </article>
      </section>
    </>
  );
}

export default MovieInfo;
