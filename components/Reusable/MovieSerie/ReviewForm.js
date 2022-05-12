import { FaStar } from "react-icons/fa";

function ReviewForm({ styles, id }) {
  return (
    <form className={styles.reviewForm}>
      <textarea
        className={styles.userCommentInput}
        placeholder="Here you can express your thoughts on the movie..."
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

          <input type="radio" id="radioButtonCustom" name="ratingButton" className={styles.ratingButton} />
          <label htmlFor="radioButtonCustom" className={styles.userRatingLabel}>
            Custom
            <input
              type="number"
              min={1}
              max={10}
              maxLength="2"
              step=".1"
              name="customRating"
              className={styles.customRatingInput}
            />
            <FaStar className={styles.ratingButtonIcon} />
          </label>
        </div>
      </div>

      <div className={styles.formPostClearButtonContainer}>
        <button type="submit" className={styles.formPostClearButton}>
          Post
        </button>
        <button type="reset" className={styles.formPostClearButton}>
          Clear form
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
