import Link from "next/link";

import styles from "../../styles/Home/row.module.css";

function ViewAll() {
  return (
    <section className={styles.viewAllContainer}>
      <div className={styles.viewAllButtonsContainer}>
        <Link href="/movies">
          <button type="button" className={styles.viewAllButton}>
            All movies
          </button>
        </Link>
        <Link href="/series">
          <button type="button" className={styles.viewAllButton}>
            All series
          </button>
        </Link>
        <Link href="/stats">
          <button type="button" className={styles.viewAllButton}>
            Trending stats
          </button>
        </Link>
      </div>
    </section>
  );
}

export default ViewAll;
