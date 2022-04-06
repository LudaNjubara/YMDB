import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import Personal_Info from "./Personal_Info";
import Watchlist from "./Watchlist";
import Favourites from "./Favourites";
import DangerZone from "./DangerZone";
import styles from "../../styles/Profile/profile.module.css";

function Profile() {
  const user = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState("personal_info");

  return (
    <main className={styles.profileWrapper}>
      <div className={styles.profileContainer}>
        <aside className={styles.profileAside}>
          <div className={styles.userMainInfo}>
            <div className={styles.profileImageContainer}>
              <Image src="/defaultUser.png" width={60} height={60} className={styles.profileImage} />
            </div>
            <h1 className={styles.profileUsername}>{user?.displayName}</h1>
          </div>
          <nav className={styles.profileNavigation}>
            <ul className={styles.profileNavigationList}>
              <li className={styles.profileNavigationItem}>
                <button
                  type="button"
                  onClick={(e) => {
                    setActiveTab("personal_info");
                    e.target.classList.add("active");
                  }}
                  className={styles.profileNavigationButton}
                >
                  Personal info
                </button>
              </li>
              <li className={styles.profileNavigationItem}>
                <button
                  type="button"
                  onClick={() => setActiveTab("watchlist")}
                  className={styles.profileNavigationButton}
                >
                  Your Watchlist
                </button>
              </li>
              <li className={styles.profileNavigationItem}>
                <button
                  type="button"
                  onClick={() => setActiveTab("favourites")}
                  className={styles.profileNavigationButton}
                >
                  Your Favourites
                </button>
              </li>
              <li className={styles.profileNavigationItem}>
                <button
                  type="button"
                  onClick={() => setActiveTab("dangerZone")}
                  className={styles.profileNavigationButton}
                >
                  Danger zone
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <section className={styles.profileContent}>
          {activeTab === "personal_info" && <Personal_Info user={user} />}
          {activeTab === "watchlist" && <Watchlist />}
          {activeTab === "favourites" && <Favourites />}
          {activeTab === "dangerZone" && <DangerZone />}
        </section>
      </div>
    </main>
  );
}
export default Profile;
