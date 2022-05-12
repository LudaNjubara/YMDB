import Image from "next/image";

import styles from "../../styles/Movie/movieLoading.module.css";

function MovieLoading() {
  return (
    <div className={styles.loadingWrapper}>
      <p className={styles.movieLoadingText}>
        Just a moment
        <span className={styles.movieLoadingTextDot}>.</span>
        <span className={styles.movieLoadingTextDot}>.</span>
        <span className={styles.movieLoadingTextDot}>.</span>
      </p>
      <div className={styles.movieLoadingImageContainer}>
        <Image
          src="/movieLoading.svg"
          width={800}
          height={400}
          className={styles.movieLoadingImage}
          priority={true}
          alt="Movie loading"
        />
      </div>
    </div>
  );
}

export default MovieLoading;
