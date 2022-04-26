import styles from "../../styles/Profile/profileNavSections.module.css";

function DangerZone() {
  return (
    <section>
      <article className={styles.navSectionContentArticle}>
        <div className={styles.titleAndDescriptionContainer}>
          <h3 className={styles.articleTitle}>Danger Zone</h3>
          <p className={styles.articleDescription}>
            Thread carrefully while altering the following settings. Choosing to proceed with said settings
            will result in permanent changes to your account, some of which will result in losing some or all
            account data. Please be careful.
          </p>
        </div>

        <div className={styles.articleContent}></div>
      </article>
    </section>
  );
}

export default DangerZone;
