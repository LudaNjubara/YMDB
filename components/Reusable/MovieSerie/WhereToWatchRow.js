import Image from "next/image";
import uniqid from "uniqid";
import HorizontalScrollButton from "../HorizontalScrollButtons";
import { baseImageURL } from "../../Utils/utils";

function WhereToWatchRow({ styles, title, results }) {
  switch (title) {
    case "Buy":
      return (
        <div className={styles.whereToWatchRow}>
          <h2 className={styles.whereToWatchRowTitle}>Buy</h2>

          <div className={styles.whereToWatchScrollableRow}>
            {results?.watchProviders?.US?.buy ? (
              <>
                <HorizontalScrollButton side="left" isWhite isSmall />
                {results?.watchProviders?.US?.buy.map((provider) => {
                  return (
                    <div className={styles.whereToWatchImageContainer} key={uniqid()}>
                      <Image
                        src={`${baseImageURL}${provider?.logo_path}`}
                        layout="fill"
                        className={styles.whereToWatchProviderImage}
                      />
                    </div>
                  );
                })}
                <HorizontalScrollButton side="right" isWhite isSmall />
              </>
            ) : (
              "Unavailable"
            )}
          </div>
        </div>
      );
    case "Rent":
      return (
        <div className={styles.whereToWatchRow}>
          <h2 className={styles.whereToWatchRowTitle}>Rent</h2>

          <div className={styles.whereToWatchScrollableRow}>
            {results?.watchProviders?.US?.rent ? (
              <>
                <HorizontalScrollButton side="left" isWhite isSmall />
                {results?.watchProviders?.US?.rent.map((provider) => {
                  return (
                    <div className={styles.whereToWatchImageContainer} key={uniqid()}>
                      <Image
                        src={`${baseImageURL}${provider?.logo_path}`}
                        layout="fill"
                        className={styles.whereToWatchProviderImage}
                      />
                    </div>
                  );
                })}
                <HorizontalScrollButton side="right" isWhite isSmall />
              </>
            ) : (
              "Unavailable"
            )}
          </div>
        </div>
      );
    case "Streaming on":
      return (
        <div className={styles.whereToWatchRow}>
          <h2 className={styles.whereToWatchRowTitle}>Streaming on</h2>

          <div className={styles.whereToWatchScrollableRow}>
            {results?.watchProviders?.US?.flatrate ? (
              <>
                <HorizontalScrollButton side="left" isWhite isSmall />
                {results?.watchProviders?.US?.flatrate.map((provider) => {
                  return (
                    <div className={styles.whereToWatchImageContainer} key={uniqid()}>
                      <Image
                        src={`${baseImageURL}${provider?.logo_path}`}
                        layout="fill"
                        className={styles.whereToWatchProviderImage}
                      />
                    </div>
                  );
                })}
                <HorizontalScrollButton side="right" isWhite isSmall />
              </>
            ) : (
              "Unavailable"
            )}
          </div>
        </div>
      );
  }
}

export default WhereToWatchRow;
