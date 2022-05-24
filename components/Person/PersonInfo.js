import Image from "next/image";
import moment from "moment";
import { baseImageURL } from "../Utils/utils";
import ImagesRow from "../Reusable/MovieSerie/ImagesRow";
import SimilarRow from "../Reusable/MovieSerie/SimilarRow";
import PopularPeople from "./PopularPeople";

import styles from "../../styles/Person/personInfo.module.css";

function PersonInfo({ personResults }) {
  return (
    <>
      {/* Body Background Image */}
      <div className={styles.backgroundImageContainer}>
        <Image
          src={`${baseImageURL}${personResults?.details?.profile_path}`}
          alt={personResults?.details?.name}
          layout="fill"
          className={styles.backgroundImage}
        />
      </div>

      {/* Person Info Wrapper */}
      <section className={styles.infoWrapper}>
        <article className={`${styles.imageWrapper} ${styles.article}`}>
          <Image
            src={`${baseImageURL}${personResults?.details?.profile_path}`}
            alt={personResults?.details?.name}
            layout="fill"
            className={styles.image}
            priority="true"
          />
        </article>

        {/* Main Info */}
        <article className={`${styles.mainInfoWrapper} ${styles.article}`}>
          <div className={styles.mainInfoContent}>
            <h1 className={styles.mainInfoTitle}>{personResults?.details?.name}</h1>

            <div className={`${styles.mainInfoSectionContainer} ${styles.commonInfoContainer}`}>
              <div className={styles.commonInfoItem}>
                <div className={styles.commonInfoItemIconContainer}></div>
                <div className={styles.commonInfoItemContentContainer}>
                  <h2 className={styles.mainInfoSectionTitle}>PROFESSION</h2>
                  <p>
                    {personResults?.details?.known_for_department
                      ? personResults?.details?.known_for_department
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className={styles.commonInfoItem}>
                <h2 className={styles.mainInfoSectionTitle}>BIRTHDAY</h2>
                <p>
                  {personResults?.details?.birthday
                    ? moment(personResults?.details?.birthday).format("Do MMMM YYYY")
                    : "N/A"}
                </p>
              </div>
              <div className={styles.commonInfoItem}>
                <h2 className={styles.mainInfoSectionTitle}>DEATHDAY</h2>
                <p>
                  {personResults?.details?.deathday
                    ? moment(personResults?.details?.deathday).format("Do MMMM YYYY")
                    : "N/A"}
                </p>
              </div>
              <div className={styles.commonInfoItem}>
                <h2 className={styles.mainInfoSectionTitle}>BORN AT</h2>
                <p>
                  {personResults?.details?.place_of_birth ? personResults?.details?.place_of_birth : "N/A"}
                </p>
              </div>
            </div>

            <div className={styles.mainInfoSectionContainer}>
              <h2 className={styles.mainInfoSectionTitle}>BIOGRAPHY</h2>
              <p className={styles.biography}>{personResults?.details?.biography}</p>
            </div>
          </div>
        </article>

        {/* Images */}
        <article className={`${styles.imagesWrapper} ${styles.article}`}>
          <h1 className={styles.articleTitle}>Images</h1>

          <ImagesRow styles={styles} results={personResults} />
        </article>

        {/* Person movies */}
        <article className={`${styles.relatedWrapper} ${styles.article}`}>
          <h1 className={styles.articleTitle}>Movies by {personResults?.details?.name}</h1>

          <SimilarRow styles={styles} type="movie" results={personResults} isFromPersonPage />
        </article>

        {/* Popular people */}
        <article className={`${styles.popularWrapper} ${styles.article}`}>
          <h1 className={styles.articleTitle}>Users also search for</h1>

          <PopularPeople styles={styles} results={personResults} />
        </article>
      </section>
    </>
  );
}

export default PersonInfo;
