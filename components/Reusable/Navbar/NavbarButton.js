import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { BiCaretDown, BiLogOut, BiCog } from "react-icons/bi";
import styles from "../../../styles/Reusable/navbar.module.css";

const NavbarButton = () => {
  const user = useSelector(selectUser);
  const [userLoginState, setUserLoginState] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => (userAuth ? setUserLoginState(true) : setUserLoginState(false)));
  });

  if (userLoginState) {
    return (
      <button
        type="button"
        className={styles.profileButton}
        onClick={() => {
          const userOptionsContainer = document.getElementById("userOptionsContainerId");

          if (userOptionsContainer.style.opacity === "1") {
            userOptionsContainer.style.opacity = "0";
            userOptionsContainer.style.transform = "translate(-50%, -10px)";
          } else {
            userOptionsContainer.style.opacity = "1";
            userOptionsContainer.style.transform = "translate(-50%, 0)";
          }
        }}
      >
        <div className={styles.profileImageContainer}>
          <Image
            src="/defaultUser.png"
            width={30}
            height={30}
            alt="Profile image"
            className={styles.profileImage}
          ></Image>
        </div>

        <BiCaretDown className={styles.caretDownIcon} />

        <div id="userOptionsContainerId" className={styles.userOptionsContainer}>
          <h3 className={styles.userOptionsTitle}>{user?.displayName}</h3>
          <Link href="/profile">
            <a className={styles.userOptionContainer}>
              <BiCog className={styles.userOptionIcon} />
              <span className={styles.userOptionText}>Preferences</span>
            </a>
          </Link>

          <Link href="/login">
            <a className={styles.userOptionContainer}>
              <BiCaretDown className={styles.userOptionIcon} />
              <span className={styles.userOptionText}>Whatever</span>
            </a>
          </Link>

          <div className={styles.userOptionContainer} onClick={() => auth.signOut()}>
            <BiLogOut className={styles.userOptionIcon} />
            <span className={styles.userOptionText}>Logout</span>
          </div>
        </div>
      </button>
    );
  } else {
    return (
      <Link href="/login">
        <a className={styles.loginButton}>Login</a>
      </Link>
    );
  }
};

export default NavbarButton;
