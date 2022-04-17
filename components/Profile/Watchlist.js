import styles from "../../styles/Profile/profile.module.css";

function Watchlist() {
  return (
    <article>
      <h1 className={styles.articleTitle}>Watchlist</h1>
      <div className={styles.watchlistAndFavouritesContainer}>
        {/* DORADITIIII */}
        <div className={styles.watchlistAndFavouritesMovieContainer}></div>
      </div>
    </article>
  );
}

export default Watchlist;
