import Image from "next/image";
import uniqid from "uniqid";
import HorizontalScrollButton from "../../Reusable/HorizontalScrollButtons";
import { baseImageURL, randomImageGenerator } from "../../Utils/utils";

function ImagesRow({ styles, results }) {
  return (
    <div className={styles.imagesScrollableRow}>
      <HorizontalScrollButton side="left" isWhite />
      {randomImageGenerator(results).map((image) => {
        return image.aspect_ratio < 1 ? (
          <div className={styles.imageContainerVertical} key={uniqid()}>
            <Image src={`${baseImageURL}${image.file_path}`} layout="fill" className={styles.image} />
          </div>
        ) : (
          <div className={styles.imageContainerHorizontal} key={uniqid()}>
            <Image src={`${baseImageURL}${image.file_path}`} layout="fill" className={styles.image} />
          </div>
        );
      })}
      <HorizontalScrollButton side="right" isWhite />
    </div>
  );
}

export default ImagesRow;
