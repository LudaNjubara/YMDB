import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Home/joinUs.module.css";

function Join() {
  return (
    <section className={styles.joinUs}>
      <div className={styles.joinUsContent}>
        <h1 className={styles.joinUsTitle}>
          Join the community <br />
          <span className={styles.joinUsTitleSmall}>and become a part of something bigger</span>
        </h1>
        <p className={styles.joinUsDescription}>
          <span className={styles.joinUsDescriptionBigWord}>Share</span> thoughts on your favourite{" "}
          <span className={styles.joinUsDescriptionBigWord}>movies</span>, see what others have to{" "}
          <span className={styles.joinUsDescriptionBigWord}>say</span>, make your{" "}
          <span className={styles.joinUsDescriptionBigWord}>vote</span> help a stranger in dilemma or help
          yourself and <span className={styles.joinUsDescriptionBigWord}>find</span> that perfect movie for
          the sleepover.
        </p>
        <Link href="/login">
          <a className={styles.joinUsButton}>Join Us</a>
        </Link>
      </div>
      <div className={styles.joinUsImageContainer}>
        <Image src="/join_us.svg" alt="Join Us Image" layout="fill" className={styles.joinUsImage} />
      </div>
    </section>
  );
}

export default Join;
