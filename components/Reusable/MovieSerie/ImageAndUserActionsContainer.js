import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { setDoc, doc, arrayUnion } from "firebase/firestore";
import { database } from "../../firebase";
import { baseImageURL } from "../../Utils/utils";

import { BsStarFill, BsBookmarkFill } from "react-icons/bs";
import { FaCheck, FaExclamation } from "react-icons/fa";

function ImageAndUserActionsContainer({ styles, id, fromPage, results }) {
  const user = useSelector(selectUser);
  const router = useRouter();
  const [addToWatchlistSuccess, setAddToWatchlistSuccess] = useState(null);
  const [addToFavouritesSuccess, setAddToFavouritesSuccess] = useState(null);

  function addToWatchlist(id) {
    setDoc(
      doc(database, "watchlists", user.email),
      fromPage === "movie" ? { movies: arrayUnion(id) } : { series: arrayUnion(id) },
      { merge: true }
    )
      .then(() => {
        setAddToWatchlistSuccess(true);
        setTimeout(() => {
          setAddToWatchlistSuccess(null);
        }, 3000);
      })
      .catch(() => {
        setAddToWatchlistSuccess(false);
        setTimeout(() => {
          setAddToWatchlistSuccess(null);
        }, 3000);
      });
  }

  function addToFavourites(id) {
    // add to favourites
    setDoc(
      doc(database, "favourites", user.email),
      fromPage === "movie" ? { movies: arrayUnion(id) } : { series: arrayUnion(id) },
      { merge: true }
    )
      .then(() => {
        setAddToFavouritesSuccess(true);
        setTimeout(() => {
          setAddToFavouritesSuccess(null);
        }, 3000);
      })
      .catch(() => {
        setAddToFavouritesSuccess(false);
        setTimeout(() => {
          setAddToFavouritesSuccess(null);
        }, 3000);
      });
  }

  function initializeAdding(buttonChoice) {
    if (!user) {
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });

      return;
    }

    buttonChoice === "watchlist" ? addToWatchlist(id) : addToFavourites(id);
  }

  useEffect(() => {
    return () => {
      setAddToWatchlistSuccess(null);
      setAddToFavouritesSuccess(null);
    };
  }, []);

  return (
    <>
      {(addToWatchlistSuccess || addToFavouritesSuccess) !== null && (
        <div
          className={`${styles.messageContainer} ${
            (addToWatchlistSuccess || addToFavouritesSuccess) === true ? styles.success : styles.error
          }`}
        >
          <div className={styles.messageIconContainer}>
            {(addToWatchlistSuccess || addToFavouritesSuccess) === true ? (
              <FaCheck className={styles.messageIconSuccess} />
            ) : (
              <FaExclamation className={styles.messageIconError} />
            )}
          </div>
          <div className={styles.messageTextContainer}>
            {(addToWatchlistSuccess || addToFavouritesSuccess) === true ? (
              <p className={styles.messageText}>
                Your
                {(addToWatchlistSuccess && " watchlist has ") ||
                  (addToFavouritesSuccess && " favourites have ")}
                been updated!
              </p>
            ) : (
              <p className={styles.messageText}>Something went wrong. Please try again later.</p>
            )}
          </div>
        </div>
      )}
      <Image
        src={`${baseImageURL}${results?.details?.poster_path}`}
        alt={results?.details?.name || results?.details?.title || results?.details?.original_title}
        layout="fill"
        className={styles.image}
        priority="true"
      />
      <div className={styles.userActionsContainer}>
        <button
          type="button"
          className={styles.userActionButton}
          onClick={() => initializeAdding("watchlist")}
        >
          <BsBookmarkFill className={styles.userActionIcon} />
          <span className={styles.userActionButtonText}>Add to Watchlist</span>
        </button>
        <button
          type="button"
          className={styles.userActionButton}
          onClick={() => initializeAdding("favourites")}
        >
          <BsStarFill className={styles.userActionIcon} />
          <span className={styles.userActionButtonText}>Add to Favourites</span>
        </button>
      </div>
    </>
  );
}

export default ImageAndUserActionsContainer;
