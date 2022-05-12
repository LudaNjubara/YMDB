import { scrollHorizontally } from "../Utils/utils";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import styles from "../../styles/Reusable/horizontalScrollButtons.module.css";

function HorizontalScrollButtons({ side, isSmall, isWhite, isNetflix }) {
  const isPrev = side === "left" ? true : false;

  return (
    <button
      type="button"
      id={isPrev ? "prevButton" : "nextButton"}
      className={`${styles.scrollHorizontallyButton} ${isSmall && styles.isSmall} ${
        isWhite && styles.isWhite
      } ${isNetflix && styles.isNetflix}`}
      onClick={(e) => scrollHorizontally(isPrev, e.target.parentElement, isSmall)}
    >
      {isPrev ? (
        <FaAngleLeft className={styles.scrollHorizontallyButtonIcon} />
      ) : (
        <FaAngleRight className={styles.scrollHorizontallyButtonIcon} />
      )}
    </button>
  );
}

export default HorizontalScrollButtons;
