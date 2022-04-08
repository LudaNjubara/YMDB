import Image from "next/image";
import styles from "../../styles/Movie/movieUnavailable.module.css";

function MovieUnavailable() {
  return (
    <div className={styles.unavailableWrapper}>
      <p className={styles.movieUnavailableText}>
        <span className={styles.oopsText}>Oops...</span> seems like we can&apos;t find what you&apos;re
        looking for
      </p>
      <div className={styles.movieUnavailableImageContainer}>
        <Image
          src="/movieUnavailable.svg"
          width={600}
          height={500}
          className={styles.movieUnavailableImage}
          priority={true}
          alt="Movie not found"
        />
      </div>
    </div>
  );
}

export default MovieUnavailable;
