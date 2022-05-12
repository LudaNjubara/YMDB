import Link from "next/link";

import styles from "../../styles/Home/row.module.css";

function ViewAll() {
  return (
    <section className={styles.viewAllContainer}>
      <div className={styles.viewAllButtonsContainer}>
        <Link href="/movies">
          <button type="button" className={styles.viewAllButton}>
            View all movies
          </button>
        </Link>
        <Link href="/series">
          <button type="button" className={styles.viewAllButton}>
            View all series
          </button>
        </Link>
      </div>
    </section>
  );
}

export default ViewAll;
