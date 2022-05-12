import Link from "next/link";
import Image from "next/image";
import uniqid from "uniqid";
import HorizontalScrollButton from "../Reusable/HorizontalScrollButtons";
import { baseImageURL } from "../Utils/utils";

function PopularPeople({ styles, results }) {
  return (
    <div className={styles.popularScrollableRow}>
      <HorizontalScrollButton side="left" isWhite />
      {results?.popular?.results?.map((person) => {
        return (
          <Link href={`/people/${encodeURIComponent(person?.id)}`} key={uniqid()}>
            <div className={styles.popularCard}>
              <div className={styles.popularImageContainer}>
                <Image
                  src={`${baseImageURL}${person?.profile_path}`}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII="
                  alt={person?.name}
                  layout="fill"
                  className={styles.memberImage}
                />
              </div>
              <h3 className={styles.popularName}>{person?.name}</h3>
            </div>
          </Link>
        );
      })}
      <HorizontalScrollButton side="right" isWhite />
    </div>
  );
}

export default PopularPeople;
