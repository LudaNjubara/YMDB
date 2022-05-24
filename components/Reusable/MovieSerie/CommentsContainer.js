import { useEffect, useState } from "react";
import uniqid from "uniqid";
import moment from "moment";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase";
import { baseImageURL } from "../../Utils/utils";

import { BsStarFill } from "react-icons/bs";

function CommentsContainer({ styles, fromPage, id, results }) {
  const [commentsArray, setCommentsArray] = useState([]);

  function expandOrShrinkComment(targetButton, commentContainer) {
    // if commentContainer has class expandedComment then change innerHTML of targetBUtton to Shrink Comment, otherwise to Expand Comment
    if (commentContainer.classList.contains(`${styles.expandedComment}`)) {
      targetButton.innerHTML = "Expand Comment";
    } else {
      targetButton.innerHTML = "Shrink Comment";
    }
    commentContainer.classList.toggle(styles.expandedComment);
  }

  function getUserComments() {
    const userCommentsRef = collection(
      database,
      `${fromPage === "movie" ? "movies" : "series"}/${id}/reviews`
    );
    const userComments = getDocs(userCommentsRef)
      .then((commentsData) => {
        commentsData.forEach((commentData) => {
          setCommentsArray((prevComments) => [...prevComments, commentData.data()]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUserComments();
  }, []);

  return (
    <div className={styles.commentsContainer}>
      {commentsArray &&
        commentsArray.map((comment) => {
          return (
            <div className={styles.commentContainer} key={uniqid()}>
              <div className={styles.commentInfoContainer}>
                <div className={styles.userInfoContainer}>
                  <div className={styles.userImageContainer}>
                    <img
                      src={comment.userProfileImage}
                      alt="Avatar"
                      className={styles.userImage}
                      width={50}
                      height={50}
                    />
                  </div>
                  <h3 className={styles.userUsername}>{comment.username}</h3>
                  <p className={styles.commentDate}>{`Created at ${comment.date}`}</p>
                </div>

                <div className={styles.userVoteContainer}>
                  {comment.rating}
                  <BsStarFill className={styles.commentAvgVoteIcon} />
                </div>
              </div>

              <p className={styles.userComment}>{comment.comment}</p>

              {comment.comment.length > 300 && (
                <button
                  type="button"
                  className={styles.expandShrinkCommentButton}
                  onClick={(e) => {
                    expandOrShrinkComment(e.target, e.target.parentElement);
                  }}
                >
                  Expand Comment
                </button>
              )}
            </div>
          );
        })}
      {results?.reviews?.results.map((review) => {
        return (
          <div className={styles.commentContainer} key={uniqid()}>
            <div className={styles.commentInfoContainer}>
              <div className={styles.userInfoContainer}>
                <div className={styles.userImageContainer}>
                  <img
                    src={
                      review?.author_details?.avatar_path?.includes("gravatar")
                        ? review?.author_details?.avatar_path?.substring(1)
                        : !review?.author_details?.avatar_path?.includes("gravatar") &&
                          review?.author_details?.avatar_path !== null
                        ? `${baseImageURL}${review?.author_details?.avatar_path}`
                        : "/defaultUser.png"
                    }
                    alt="Avatar"
                    className={styles.userImage}
                    width={50}
                    height={50}
                  />
                </div>
                <h3 className={styles.userUsername}>{review?.author_details?.username}</h3>
                <p className={styles.commentDate}>{`Created at ${moment(new Date(review?.created_at)).format(
                  "Do MMMM YYYY"
                )}`}</p>
              </div>

              <div className={styles.userVoteContainer}>
                {review?.author_details?.rating ? review?.author_details?.rating : "N/A"}
                <BsStarFill className={styles.commentAvgVoteIcon} />
              </div>
            </div>

            <p className={styles.userComment}>{review?.content}</p>

            {review?.content.length > 300 && (
              <button
                type="button"
                className={styles.expandShrinkCommentButton}
                onClick={(e) => {
                  expandOrShrinkComment(e.target, e.target.parentElement);
                }}
              >
                Expand Comment
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CommentsContainer;
