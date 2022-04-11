import Image from "next/image";
import Link from "next/link";
import styles from "../styles/404/page_404.module.css";

function custom404() {
  return (
    <div className={styles.unavailableWrapper}>
      <p className={styles.pageErrorText}>
        <span className={styles.emptinessText}>Such emptiness...</span> Try finding your way back over
        <Link href="/">
          <a className={styles.homeLink}>here</a>
        </Link>
      </p>
      <div className={styles.pageErrorImageContainer}>
        <Image
          src="/_404_.svg"
          width={700}
          height={600}
          className={styles.pageErrorImage}
          priority={true}
          alt="Movie not found"
        />
      </div>
    </div>
  );
}

export default custom404;
