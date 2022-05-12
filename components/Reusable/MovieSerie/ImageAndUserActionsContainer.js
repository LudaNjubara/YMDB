import Image from "next/image";
import { baseImageURL } from "../../Utils/utils";

import { BsStarFill, BsBookmarkFill } from "react-icons/bs";

function ImageAndUserActionsContainer({ styles, results }) {
  return (
    <>
      <Image
        src={`${baseImageURL}${results?.details?.poster_path}`}
        alt={results?.details?.name || results?.details?.title || results?.details?.original_title}
        layout="fill"
        className={styles.image}
        priority="true"
      />
      <div className={styles.userActionsContainer}>
        <button type="button" className={styles.userActionButton}>
          <BsBookmarkFill className={styles.userActionIcon} />
          Add to Watchlist
        </button>
        <button type="button" className={styles.userActionButton}>
          <BsStarFill className={styles.userActionIcon} />
          Add to Favourites
        </button>
      </div>
    </>
  );
}

export default ImageAndUserActionsContainer;
