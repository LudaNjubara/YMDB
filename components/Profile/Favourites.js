import styles from "../../styles/Profile/profileNavSections.module.css";

function Favourites() {
  return (
    <section>
      <article className={styles.navSectionContentArticle}>
        <div className={styles.titleAndDescriptionContainer}>
          <h3 className={styles.articleTitle}>Favourites</h3>
          <p className={styles.articleDescription}>
            Here is where all your favourite movies reside. To add movies to your Favourites simply click/tap
            on button "Add to Favourites" when viewing a specific movie and you will be able to see them here.
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

export default Favourites;
