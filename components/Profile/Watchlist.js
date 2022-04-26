import styles from "../../styles/Profile/profileNavSections.module.css";

function Watchlist() {
  return (
    <section>
      <article className={styles.navSectionContentArticle}>
        <div className={styles.titleAndDescriptionContainer}>
          <h3 className={styles.articleTitle}>Watchlist</h3>
          <p className={styles.articleDescription}>
            Here is where all your movies you wish to watch reside. To add movies to your Watchlist simply
            click/tap on button "Add to Watchlist" when viewing a specific movie and you will be able to see
            them here.
          </p>
        </div>

        <div className={styles.articleContent}>
          <div className={styles.watchlistAndFavouritesContainer}>
            <div className={styles.watchlistAndFavouritesItem}></div>
            <div className={styles.watchlistAndFavouritesItem}></div>
            <div className={styles.watchlistAndFavouritesItem}></div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Watchlist;
