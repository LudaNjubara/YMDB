import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, addDoc, setDoc, doc, increment } from "firebase/firestore";
import { auth, database } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import moment from "moment";

import { FaStar, FaCheck, FaExclamation } from "react-icons/fa";

function ReviewForm({ styles, fromPage, id }) {
  const user = useSelector(selectUser);
  const router = useRouter();
  const [postCommentSuccess, setPostCommentSuccess] = useState(null);

  useEffect(() => {
    const storedVote = sessionStorage.getItem("vote");
    const storedComment = sessionStorage.getItem("comment");
    const userCommentInput = document.querySelector(`.${styles.userCommentInput}`);
    const userRatingInputs = [...document.querySelectorAll("input[name='ratingButton']")];

    if (storedVote && storedComment) {
      userRatingInputs.forEach((input) => {
        if (input.value === storedVote) input.checked = true;
      });
      userCommentInput.value = sessionStorage.getItem("comment");
    }

    sessionStorage.removeItem("vote");
    sessionStorage.removeItem("comment");

    return () => {
      setPostCommentSuccess(null);
    };
  }, []);

  function postComment(userCommentInput, userRatingInput) {
    addDoc(collection(database, `${fromPage === "movie" ? "movies" : "series"}/${id}/reviews`), {
      comment: userCommentInput.value || null,
      rating: userRatingInput.value || "N/A",
      username: auth.currentUser.displayName,
      userProfileImage: auth.currentUser.photoURL || "/defaultUser.png",
      date: moment(new Date()).format("Do MMMM YYYY"),
    })
      .then(() => {
        setPostCommentSuccess(true);
        setTimeout(() => {
          setPostCommentSuccess(null);
        }, 3000);
      })
      .catch(() => {
        setPostCommentSuccess(false);
        setTimeout(() => {
          setPostCommentSuccess(null);
        }, 3000);
      });
  }

  function addToStatistics(userCommentInput, userRatingInput) {
    setDoc(
      doc(database, "statistics", user.email),
      {
        numOfComments: increment(1),
        sumOfCommentLength: increment(userCommentInput.value.split(" ").length),
        numOfVotes: increment(1),
        sumOfStars: increment(userRatingInput.value),
      },
      { merge: true }
    )
      .then((doc) => {
        console.log(doc);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function initializeComment() {
    const userCommentInput = document.querySelector(`.${styles.userCommentInput}`);
    const userRatingInput = document.querySelector("input[name='ratingButton']:checked");

    if (!(userCommentInput.value && userRatingInput)) {
      alert("Please enter a comment and rate the movie");
      return;
    }

    if (!user) {
      sessionStorage.setItem("vote", userRatingInput.value);
      sessionStorage.setItem("comment", userCommentInput.value);

      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });

      return;
    }

    postComment(userCommentInput, userRatingInput);
    addToStatistics(userCommentInput, userRatingInput);
  }

  return (
    <>
      {postCommentSuccess !== null && (
        <div
          className={`${styles.messageContainer} ${
            postCommentSuccess === true ? styles.success : styles.error
          }`}
        >
          <div className={styles.messageIconContainer}>
            {postCommentSuccess === true ? (
              <FaCheck className={styles.messageIconSuccess} />
            ) : (
              <FaExclamation className={styles.messageIconError} />
            )}
          </div>
          <div className={styles.messageTextContainer}>
            {postCommentSuccess === true ? (
              <p className={styles.messageText}>Your comment has been posted!</p>
            ) : (
              <p className={styles.messageText}>Something went wrong, please try again</p>
            )}
          </div>
        </div>
      )}

      <form className={styles.reviewForm}>
        <textarea
          className={styles.userCommentInput}
          placeholder={`Here you can express your thoughts on the ${
            fromPage === "movie" ? "movie" : "serie"
          }...`}
          spellCheck="false"
          required={true}
        ></textarea>

        <div className={styles.userRatingContainer}>
          <h2 className={styles.smallArticleTitle}>Your rating</h2>

          <div className={styles.ratingsContainer}>
            <input
              type="radio"
              id="ratingButton1"
              name="ratingButton"
              value="1"
              className={styles.ratingButton}
            />
            <label htmlFor="ratingButton1" className={styles.userRatingLabel}>
              1
              <FaStar className={styles.ratingButtonIcon} />
            </label>
            <input
              type="radio"
              id="ratingButton2"
              name="ratingButton"
              value="2"
              className={styles.ratingButton}
            />
            <label htmlFor="ratingButton2" className={styles.userRatingLabel}>
              2
              <FaStar className={styles.ratingButtonIcon} />
            </label>
            <input
              type="radio"
              id="ratingButton3"
              name="ratingButton"
              value="3"
              className={styles.ratingButton}
            />
            <label htmlFor="ratingButton3" className={styles.userRatingLabel}>
              3
              <FaStar className={styles.ratingButtonIcon} />
            </label>

            <input
              type="radio"
              id="radioButton4"
              name="ratingButton"
              value="4"
              className={styles.ratingButton}
            />
            <label htmlFor="radioButton4" className={styles.userRatingLabel}>
              4
              <FaStar className={styles.ratingButtonIcon} />
            </label>

            <input
              type="radio"
              id="radioButton5"
              name="ratingButton"
              value="5"
              className={styles.ratingButton}
            />
            <label htmlFor="radioButton5" className={styles.userRatingLabel}>
              5
              <FaStar className={styles.ratingButtonIcon} />
            </label>

            <input
              type="radio"
              id="radioButton6"
              name="ratingButton"
              value="6"
              className={styles.ratingButton}
            />
            <label htmlFor="radioButton6" className={styles.userRatingLabel}>
              6
              <FaStar className={styles.ratingButtonIcon} />
            </label>

            <input
              type="radio"
              id="radioButton7"
              name="ratingButton"
              value="7"
              className={styles.ratingButton}
            />
            <label htmlFor="radioButton7" className={styles.userRatingLabel}>
              7
              <FaStar className={styles.ratingButtonIcon} />
            </label>

            <input
              type="radio"
              id="radioButton8"
              name="ratingButton"
              value="8"
              className={styles.ratingButton}
            />
            <label htmlFor="radioButton8" className={styles.userRatingLabel}>
              8
              <FaStar className={styles.ratingButtonIcon} />
            </label>

            <input
              type="radio"
              id="radioButton9"
              name="ratingButton"
              value="9"
              className={styles.ratingButton}
            />
            <label htmlFor="radioButton9" className={styles.userRatingLabel}>
              9
              <FaStar className={styles.ratingButtonIcon} />
            </label>

            <input
              type="radio"
              id="radioButton10"
              name="ratingButton"
              value="10"
              className={styles.ratingButton}
            />
            <label htmlFor="radioButton10" className={styles.userRatingLabel}>
              10
              <FaStar className={styles.ratingButtonIcon} />
            </label>
          </div>
        </div>

        <div className={styles.formPostClearButtonContainer}>
          <button type="button" className={styles.formPostClearButton} onClick={initializeComment}>
            Post
          </button>
          <button type="reset" className={styles.formPostClearButton}>
            Clear form
          </button>
        </div>
      </form>
    </>
  );
}

export default ReviewForm;
