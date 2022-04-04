import Image from "next/image";
import Personal_Info from "./Personal_Info";
import Watchlist from "./Watchlist";
import Favourites from "./Favourites";
import DangerZone from "./DangerZone";
import styles from "../../styles/Profile/profile.module.css";

function Profile() {
  return (
    <main className={styles.profileWrapper}>
      <section className={styles.profileContainer}>
        <aside className={styles.profileAside}>
          <div className={styles.userMainInfo}>
            <div className={styles.profileImageContainer}>
              <Image src="/defaultUser.png" width={60} height={60} className={styles.profileImage} />
            </div>
            <h1 className={styles.profileUsername}>LudaNjubara</h1>
          </div>
          <nav className={styles.profileNavigation}>
            <ul className={styles.profileNavigationList}>
              <li className={styles.profileNavigationItem}>
                <button type="button" className={styles.profileNavigationButton}>
                  Personal info
                </button>
              </li>
              <li className={styles.profileNavigationItem}>
                <button type="button" className={styles.profileNavigationButton}>
                  Your Watchlist
                </button>
              </li>
              <li className={styles.profileNavigationItem}>
                <button type="button" className={styles.profileNavigationButton}>
                  Your Favourites
                </button>
              </li>
              <li className={styles.profileNavigationItem}>
                <button type="button" className={styles.profileNavigationButton}>
                  Danger zone
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <article className={styles.profileContent}>
          <Personal_Info />
          <Watchlist />
          <Favourites />
          <DangerZone />
        </article>
      </section>
    </main>
  );
}

export default Profile;
