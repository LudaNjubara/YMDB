import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { auth, updateProfile } from "../firebase";

import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

import styles from "../../styles/Profile/profileNavSections.module.css";

function Personal_Info({ user, statistics }) {
  const [updateProfileUsernameButtonDisabled, setUpdateProfileUsernameButtonDisabled] = useState(true);
  const [updateProfileImageButtonDisabled, setUpdateProfileImageButtonDisabled] = useState(true);
  const [previewProfileImage, setPreviewProfileImage] = useState(null);
  const allowedImageTypes = ["png", "jpg", "jpeg"];
  const dispatch = useDispatch();

  function greetUser() {
    const date = new Date();
    const hours = date.getHours();
    const greeting = hours < 12 ? "Good morning" : hours < 18 ? "Good afternoon" : "Good evening";
    return `${greeting} ${user?.displayName}`;
  }

  function uploadProfileImage(image) {
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

    axios({
      url: process.env.CLOUDINARY_UPLOAD_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    })
      .then((res) => {
        const { secure_url } = res.data;
        console.log(res);

        updateProfile(auth.currentUser, {
          photoURL: secure_url,
        })
          .then(() => {
            // Profile updated!
            console.log("Profile updated!");
            dispatch(
              login({
                ...user,
                photoURL: secure_url,
              })
            );
          })
          .catch((error) => {
            // An error occurred
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
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
              <Image
                src={`${
                  previewProfileImage || user?.photoURL || auth.currentUser.photoURL || "/defaultUser.png"
                }`}
                width={60}
                height={60}
                className={styles.profileImage}
              />
            </div>
            <div className={styles.buttonsContainer}>
              <label htmlFor="uploadImageInput" className={styles.uploadImageLabel} tabIndex="0">
                <AiOutlineCloudUpload className={styles.uploadImageIcon} />
                Upload
                <input
                  type="file"
                  id="uploadImageInput"
                  className={styles.uploadImageInput}
                  onChange={(e) => {
                    const input = e.target;

                    if (input.files.length) {
                      const image = input.files[0];
                      const imageSizeMB = image.size / 1024 / 1024;

                      if (allowedImageTypes.includes(image.type.split("/")[1])) {
                        if (imageSizeMB < 10) {
                          setPreviewProfileImage(URL.createObjectURL(image));
                          setUpdateProfileImageButtonDisabled(false);
                        } else {
                          setUpdateProfileImageButtonDisabled(true);
                          console.log("file size is too big");
                        }
                      } else {
                        setUpdateProfileImageButtonDisabled(true);
                        console.log("file type is not allowed");
                      }
                    } else {
                      setUpdateProfileImageButtonDisabled(true);
                      console.log("no file");
                    }
                  }}
                />
              </label>
              <button
                type="button"
                id="updateProfileImageButton"
                className={styles.articleButton}
                disabled={updateProfileImageButtonDisabled}
                onClick={() => {
                  const input = document.getElementById("uploadImageInput");
                  const image = input.files[0];
                  uploadProfileImage(image);
                }}
              >
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
                    setUpdateProfileUsernameButtonDisabled(true);
                    input.value = "";
                    input.disabled = true;
                    input.blur();
                    input.classList.remove(styles.enabled);
                  } else {
                    setUpdateProfileUsernameButtonDisabled(false);
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
              <button
                type="button"
                id="updateProfileUsernameButton"
                className={styles.articleButton}
                disabled={updateProfileUsernameButtonDisabled}
                onClick={() => {
                  const input = document.getElementById("profileUsernameInput");
                  const newUsername = input.value;
                  if (!newUsername) {
                    console.log("Please enter a username");
                    return;
                  }

                  if (newUsername === auth.currentUser.displayName) {
                    console.log("No changes made");
                  } else {
                    updateProfile(auth.currentUser, {
                      displayName: newUsername,
                    })
                      .then(() => {
                        // Profile updated!
                        dispatch(
                          login({
                            ...user,
                            displayName: newUsername,
                          })
                        );
                      })
                      .catch((error) => {
                        // An error occurred
                        console.log(error);
                      });
                  }
                }}
              >
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
                <p className={styles.statisticsItemValue}>
                  {statistics.numOfComments ? (
                    statistics.numOfComments
                  ) : (
                    <span className={styles.statisticsItemNoData}>No data</span>
                  )}
                </p>
              </div>
              <div className={styles.statisticsItem}>
                <h4 className={styles.statisticsItemTitle}>Number of votes</h4>
                <p className={styles.statisticsItemValue}>
                  {statistics.numOfVotes ? (
                    statistics.numOfVotes
                  ) : (
                    <span className={styles.statisticsItemNoData}>No data</span>
                  )}
                </p>
              </div>
              <div className={styles.statisticsItem}>
                <h4 className={styles.statisticsItemTitle}>Average length of reviews</h4>
                <p className={styles.statisticsItemValue}>
                  {statistics.sumOfCommentLength && statistics.numOfComments ? (
                    statistics.sumOfCommentLength / statistics.numOfComments
                  ) : (
                    <span className={styles.statisticsItemNoData}>No data</span>
                  )}
                </p>
              </div>
              <div className={styles.statisticsItem}>
                <h4 className={styles.statisticsItemTitle}>Average rating</h4>
                <p className={styles.statisticsItemValue}>
                  {statistics.numOfVotes && statistics.sumOfStars ? (
                    (statistics.numOfVotes / statistics.sumOfStars).toFixed(2)
                  ) : (
                    <span className={styles.statisticsItemNoData}>No data</span>
                  )}
                </p>
              </div>
              <div className={styles.statisticsItem}>
                <h4 className={styles.statisticsItemTitle}>Number of Watchlist movies</h4>
                <p className={styles.statisticsItemValue}>
                  {statistics.numOfWatchlists ? (
                    statistics.numOfWatchlists
                  ) : (
                    <span className={styles.statisticsItemNoData}>No data</span>
                  )}
                </p>
              </div>
              <div className={styles.statisticsItem}>
                <h4 className={styles.statisticsItemTitle}>Number of Favourite movies</h4>
                <p className={styles.statisticsItemValue}>
                  {statistics.numOfFavourites ? (
                    statistics.numOfFavourites
                  ) : (
                    <span className={styles.statisticsItemNoData}>No data</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}

export default Personal_Info;
