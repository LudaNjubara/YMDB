import React from "react";
import uniqid from "uniqid";

function KeywordsContainer({ styles, type, results }) {
  switch (type) {
    case "movie":
      return (
        <div className={styles.keywordsContainer}>
          {results?.keywords?.keywords.map((keyword) => {
            return (
              <span className={styles.keyword} key={uniqid()}>
                {keyword?.name}
              </span>
            );
          })}
        </div>
      );
    case "serie":
      return (
        <div className={styles.keywordsContainer}>
          {results?.keywords?.results.map((keyword) => {
            return (
              <span className={styles.keyword} key={uniqid()}>
                {keyword?.name}
              </span>
            );
          })}
        </div>
      );
  }
}

export default KeywordsContainer;
