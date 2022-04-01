import Image from "next/image";
import styles from "../../styles/Profile/profile.module.css";

function Profile() {
  return (
    <main className={styles.profileWrapper}>
      <section className={styles.profileContainer}>
        <aside className={styles.profileAside}>
          <div className={styles.userMainInfo}>
            <div className={styles.profileImageContainer}>
              <Image src="/defaultUser.png" layout="fill" />
            </div>
          </div>
          <nav className={styles.profileNavigation}>
            <ul className={styles.profileNavigationList}>
              <li className={styles.profileNavigationItem}>
                <a href="#personal-info" className={styles.profileNavigationLink}>
                  Personal info
                </a>
              </li>
              <li className={styles.profileNavigationItem}>
                <a href="#your-watchlist" className={styles.profileNavigationLink}>
                  Your Watchlist
                </a>
              </li>
              <li className={styles.profileNavigationItem}>
                <a href="#your-favourites" className={styles.profileNavigationLink}>
                  Your Favourites
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <article className={styles.profileContent}>
          <h1 id="personal-info">Hi there, LudaNjubara</h1>
          <h1 id="your-watchlist">Your Watchlist</h1>
          <h1 id="your-favourites">Your Favourites</h1>
        </article>
      </section>
    </main>
  );
}

export default Profile;
