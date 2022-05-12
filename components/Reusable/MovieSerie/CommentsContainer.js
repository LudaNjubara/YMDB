import uniqid from "uniqid";
import { baseImageURL, truncate } from "../../Utils/utils";

import { BsStarFill } from "react-icons/bs";

function CommentsContainer({ styles, results }) {
  return (
    <div className={styles.commentsContainer}>
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
                <p className={styles.commentDate}>{`Created at ${review?.created_at}`}</p>
              </div>

              <div className={styles.userVoteContainer}>
                {review?.author_details?.rating ? review?.author_details?.rating : "N/A"}
                <BsStarFill className={styles.commentAvgVoteIcon} />
              </div>
            </div>

            <p className={styles.userComment}>{truncate(review?.content, 500)}</p>

            <button type="button" className={styles.expandShrinkCommentButton}>
              Expand Comment
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default CommentsContainer;
