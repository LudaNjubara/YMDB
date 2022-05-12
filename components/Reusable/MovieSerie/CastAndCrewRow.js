import Image from "next/image";
import Link from "next/link";
import uniqid from "uniqid";
import HorizontalScrollButton from "../HorizontalScrollButtons";
import { baseImageURL } from "../../Utils/utils";

function CastAndCrewRow({ styles, title, results }) {
  switch (title) {
    case "Characters":
      return (
        <div className={styles.castAndCrewRow}>
          <h2 className={styles.castAndCrewRowTitle}>Characters</h2>

          <div className={styles.castAndCrewScrollableRow}>
            <HorizontalScrollButton side="left" isWhite />
            {results?.credits?.cast.map((castMember, index) => {
              return index < 20 ? (
                <Link href={`/people/${encodeURIComponent(castMember?.id)}`} key={uniqid()}>
                  <div className={styles.castAndCrewCard}>
                    <div className={styles.castAndCrewImageContainer}>
                      <Image
                        src={`${baseImageURL}${castMember?.profile_path}`}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII="
                        alt={castMember?.name}
                        width={150}
                        height={200}
                        className={styles.memberImage}
                      />
                    </div>
                    <h3 className={styles.memberName}>{castMember?.name}</h3>
                    <h4 className={styles.memberCharacterName}>{castMember.character}</h4>
                  </div>
                </Link>
              ) : null;
            })}
            <HorizontalScrollButton side="right" isWhite />
          </div>
        </div>
      );
    case "Producers":
      return (
        <div className={styles.castAndCrewRow}>
          <h2 className={styles.castAndCrewRowTitle}>Producers</h2>

          <div className={styles.castAndCrewScrollableRow}>
            <HorizontalScrollButton side="left" isWhite />
            {results?.credits?.crew
              .filter((crewMember) => {
                return crewMember?.job === "Producer";
              })
              .map((crewMember) => {
                return (
                  <Link href={`/people/${encodeURIComponent(crewMember?.id)}`} key={uniqid()}>
                    <div className={styles.castAndCrewCard} key={uniqid()}>
                      <div className={styles.castAndCrewImageContainer}>
                        <Image
                          src={`${baseImageURL}${crewMember?.profile_path}`}
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII="
                          alt={crewMember?.name}
                          width={150}
                          height={200}
                          className={styles.memberImage}
                        />
                      </div>
                      <h3 className={styles.memberName}>{crewMember?.name}</h3>
                    </div>
                  </Link>
                );
              })}
            <HorizontalScrollButton side="right" isWhite />
          </div>
        </div>
      );
    case "Screenplay":
      return (
        <div className={styles.castAndCrewRow}>
          <h2 className={styles.castAndCrewRowTitle}>Screenplay</h2>

          <div className={styles.castAndCrewScrollableRow}>
            <HorizontalScrollButton side="left" isWhite />
            {results?.credits?.crew
              .filter((crewMember) => {
                return crewMember?.job === "Screenplay" || crewMember?.job === "Writer";
              })
              .map((crewMember) => {
                return (
                  <Link href={`/people/${encodeURIComponent(crewMember?.id)}`} key={uniqid()}>
                    <div className={styles.castAndCrewCard} key={uniqid()}>
                      <div className={styles.castAndCrewImageContainer}>
                        <Image
                          src={`${baseImageURL}${crewMember?.profile_path}`}
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII="
                          alt={crewMember?.name}
                          width={150}
                          height={200}
                          className={styles.memberImage}
                        />
                      </div>
                      <h3 className={styles.memberName}>{crewMember?.name}</h3>
                    </div>
                  </Link>
                );
              })}
            <HorizontalScrollButton side="right" isWhite />
          </div>
        </div>
      );
    case "Writers":
      return (
        <div className={styles.castAndCrewRow}>
          <h2 className={styles.castAndCrewRowTitle}>Writers</h2>

          <div className={styles.castAndCrewScrollableRow}>
            <HorizontalScrollButton side="left" isWhite />
            {results?.credits?.crew
              .filter((crewMember) => {
                return (
                  crewMember?.job === "Original Series Creator" ||
                  crewMember?.known_for_department === "Writing"
                );
              })
              .map((crewMember) => {
                return (
                  <div className={styles.castAndCrewCard} key={uniqid()}>
                    <div className={styles.castAndCrewImageContainer}>
                      <Image
                        src={`${baseImageURL}${crewMember?.profile_path}`}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII="
                        alt={crewMember?.name}
                        width={150}
                        height={200}
                        className={styles.memberImage}
                      />
                    </div>
                    <h3 className={styles.memberName}>{crewMember?.name}</h3>
                  </div>
                );
              })}
            <HorizontalScrollButton side="right" isWhite />
          </div>
        </div>
      );
  }
}

export default CastAndCrewRow;
