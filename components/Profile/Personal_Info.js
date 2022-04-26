import Image from "next/image";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import styles from "../../styles/Profile/profileNavSections.module.css";

function Personal_Info({ user }) {
  function greetUser() {
    const date = new Date();
    const hours = date.getHours();
    const greeting = hours < 12 ? "Good morning" : hours < 18 ? "Good afternoon" : "Good evening";
    return `${greeting} ${user?.displayName}`;
  }

  return (
    <section>
      <h1 className={styles.sectionGreetingTitle}>{greetUser()}</h1>
      <section className={`${styles.navSectionContentContainer} ${styles.navSectionPersonalInfo}`}>
        <article className={styles.navSectionContentArticle}>
          <div className={styles.titleAndDescriptionContainer}>
            <h3 className={styles.articleTitle}>Profile image</h3>
            <p className={styles.articleDescription}>
              Here you can customize your internet look by adding a personal image. The image set here will be
              visible to everyone who has an account associated with YMDB.
            </p>
          </div>

          <div className={styles.articleContent}>
            <div className={styles.profileImageContainer}>
              <Image src="/defaultUser.png" width={60} height={60} className={styles.profileImage} />
            </div>
            <div className={styles.buttonsContainer}>
              <label htmlFor="uploadImageInput" className={styles.uploadImageLabel} tabIndex="0">
                <AiOutlineCloudUpload className={styles.uploadImageIcon} />
                Upload
                <input type="file" id="uploadImageInput" className={styles.uploadImageInput} />
              </label>
              <button type="button" className={styles.articleButton} disabled={true}>
                <IoMdCheckmark className={styles.checkmarkIcon} /> Save changes
              </button>
            </div>
          </div>
        </article>

        <article className={styles.navSectionContentArticle}>
          <div className={styles.titleAndDescriptionContainer}>
            <h3 className={styles.articleTitle}>Profile username</h3>
            <p className={styles.articleDescription}>
              Here you can customize your existing username. Note that username set here will be visible to
              everyone who has an account associated with YMDB. Please be polite and avoid using profanity.
            </p>
          </div>

          <div className={styles.articleContent}>
            <div className={styles.profileUsernameContainer}>
              <label htmlFor="profileUsernameInput">
                <input
                  type="text"
                  className={styles.profileUsernameInput}
                  id="profileUsernameInput"
                  placeholder={`${user?.displayName}`}
                  disabled={true}
                />
              </label>
              <button
                type="button"
                className={styles.articleButton}
                onClick={() => {
                  const input = document.getElementById("profileUsernameInput");
                  if (input.classList.contains(styles.enabled)) {
                    input.value = "";
                    input.disabled = true;
                    input.blur();
                    input.classList.remove(styles.enabled);
                  } else {
                    input.disabled = false;
                    input.focus();
                    input.classList.add(styles.enabled);
                  }
                }}
              >
                <FaEdit className={styles.editIcon} />
              </button>
            </div>
            <div className={styles.buttonsContainer}>
              <button type="button" className={styles.articleButton} disabled={true}>
                <IoMdCheckmark className={styles.checkmarkIcon} /> Save changes
              </button>
            </div>
          </div>
        </article>

        <article className={styles.navSectionContentArticle}>
          <div className={styles.titleAndDescriptionContainer}>
            <h3 className={styles.articleTitle}>Your statistics</h3>
            <p className={styles.articleDescription}>
              This is a place where you can view statistics about your account. Things like number of reviews
              you left, number of movies you have added to your watchlist and favourites, etc. will all be
              displayed here.
            </p>
          </div>

          <div className={styles.articleContent}>
            <div className={styles.statisticsContainer}>
              <div className={styles.statisticsItem}>
                <h4 className={styles.statisticsItemTitle}>Number of reviews</h4>
              </div>
              <div className={styles.statisticsItem}>
                <h4 className={styles.statisticsItemTitle}>Average length of reviews</h4>
              </div>
              <div className={styles.statisticsItem}>
                <h4 className={styles.statisticsItemTitle}>Number of Watchlist movies</h4>
              </div>
              <div className={styles.statisticsItem}>
                <h4 className={styles.statisticsItemTitle}>Number of Favourite movies</h4>
              </div>
              <div className={styles.statisticsItem}>
                <h4 className={styles.statisticsItemTitle}>Average rating</h4>
              </div>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}

export default Personal_Info;
