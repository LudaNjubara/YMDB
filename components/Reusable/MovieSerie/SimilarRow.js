import Link from "next/link";
import Image from "next/image";
import uniqid from "uniqid";
import HorizontalScrollButton from "../../Reusable/HorizontalScrollButtons";
import { baseImageURL, truncate } from "../../Utils/utils";

import { FaStar } from "react-icons/fa";

function SimilarRow({ styles, type, results, isFromPersonPage }) {
  switch (isFromPersonPage) {
    case true:
      return (
        <div className={styles.relatedScrollableRow}>
          <HorizontalScrollButton side="left" isWhite />
          {results?.credits?.cast
            .filter((media) => media.media_type === "movie")
            .map(
              (movie) =>
                movie?.backdrop_path && (
                  <Link
                    href={`/${type === "movie" ? "movies" : "series"}/${encodeURIComponent(movie?.id)}`}
                    key={uniqid()}
                  >
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
                          <div className={styles.relatedVoteContainer}>
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
          <HorizontalScrollButton side="right" isWhite />
        </div>
      );
    case false || undefined:
      return (
        <div className={styles.relatedScrollableRow}>
          <HorizontalScrollButton side="left" isWhite />
          {results?.similar?.results.map(
            (movie) =>
              movie?.backdrop_path && (
                <Link
                  href={`/${type === "movie" ? "movies" : "series"}/${encodeURIComponent(movie?.id)}`}
                  key={uniqid()}
                >
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
                        <div className={styles.relatedVoteContainer}>
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
          <HorizontalScrollButton side="right" isWhite />
        </div>
      );
  }
}

export default SimilarRow;
