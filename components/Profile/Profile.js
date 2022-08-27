import { useState, useEffect } from "react";
import Image from "next/image";
import { getDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { auth, database } from "../firebase";

import Personal_Info from "./Personal_Info";
import Watchlist from "./Watchlist";
import Favourites from "./Favourites";
import DangerZone from "./DangerZone";

import { BsStarFill, BsBookmarkFill } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBiohazard } from "react-icons/fa";
import styles from "../../styles/Profile/profile.module.css";

function Profile() {
  const user = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState("personal_info");
  const [statisticsData, setStatisticsData] = useState({});
  const [watchlistData, setWatchlistData] = useState({});
  const [favouritesData, setFavouritesData] = useState({});
  const profileNavButtons = document.querySelectorAll(`.${styles.profileNavigationButton}`);

  function changeActiveTab(targetElement) {
    if (targetElement.classList.contains(styles.active)) return;

    profileNavButtons.forEach((button) => {
      button.classList.remove(styles.active);
    });

    targetElement.classList.add(styles.active);
  }

  function getUserStatistics() {
    const userStatisticsRef = doc(database, "statistics", user.email);
    const userStatistics = getDoc(userStatisticsRef)
      .then((statisticsData) => {
        setStatisticsData(statisticsData.data());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUserWatchlist() {
    const userWatchlistRef = doc(database, "watchlists", user.email);
    const userWatchlist = getDoc(userWatchlistRef)
      .then((watclistData) => {
        setWatchlistData(watclistData.data());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUserFavourites() {
    const userFavouritesRef = doc(database, "favourites", user.email);
    const userFavourites = getDoc(userFavouritesRef)
      .then((favouritesData) => {
        setFavouritesData(favouritesData.data());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (user) {
      getUserStatistics();
      getUserWatchlist();
      getUserFavourites();
    }

    return () => {
      setStatisticsData({});
      setWatchlistData({});
      setFavouritesData({});
    };
  }, [user]);

  return (
    <main className={styles.profileWrapper}>
      <div className={styles.profileContainer}>
        <aside className={styles.profileAside}>
          <div className={styles.userMainInfo}>
            <div className={styles.profileImageContainer}>
              <Image
                src={`${user?.photoURL || auth.currentUser.photoURL || "/defaultUser.png"}`}
                width={60}
                height={60}
                className={styles.profileImage}
              />
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
                    changeActiveTab(e.target);
                  }}
                  className={`${styles.profileNavigationButton} ${styles.active}`}
                >
                  <MdSpaceDashboard className={styles.profileNavigationButtonIcon} />
                  <span className={styles.profileNavigationButtonText}>Personal Info</span>
                </button>
              </li>
              <li className={styles.profileNavigationItem}>
                <button
                  type="button"
                  onClick={(e) => {
                    setActiveTab("watchlist");
                    changeActiveTab(e.target);
                  }}
                  className={styles.profileNavigationButton}
                >
                  <BsBookmarkFill className={styles.profileNavigationButtonIcon} />
                  <span className={styles.profileNavigationButtonText}>Watchlist</span>
                </button>
              </li>
              <li className={styles.profileNavigationItem}>
                <button
                  type="button"
                  onClick={(e) => {
                    setActiveTab("favourites");
                    changeActiveTab(e.target);
                  }}
                  className={styles.profileNavigationButton}
                >
                  <BsStarFill className={styles.profileNavigationButtonIcon} />
                  <span className={styles.profileNavigationButtonText}>Favourites</span>
                </button>
              </li>
              <li className={styles.profileNavigationItem}>
                <button
                  type="button"
                  onClick={(e) => {
                    setActiveTab("dangerZone");
                    changeActiveTab(e.target);
                  }}
                  className={styles.profileNavigationButton}
                >
                  <FaBiohazard className={styles.profileNavigationButtonIcon} />
                  <span className={styles.profileNavigationButtonText}>Danger Zone</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <section className={styles.profileContent}>
          {activeTab === "personal_info" && (
            <Personal_Info
              user={user}
              statistics={statisticsData}
              watchlists={watchlistData}
              favourites={favouritesData}
            />
          )}
          {activeTab === "watchlist" && <Watchlist watchlists={watchlistData} />}
          {activeTab === "favourites" && <Favourites favourites={favouritesData} />}
          {activeTab === "dangerZone" && <DangerZone />}
        </section>
      </div>
    </main>
  );
}
export default Profile;
