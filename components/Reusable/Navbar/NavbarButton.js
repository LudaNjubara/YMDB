import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";

import { BiCaretDown, BiLogOut, BiCog } from "react-icons/bi";

import styles from "../../../styles/Reusable/navbar.module.css";

const NavbarButton = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [userLoginState, setUserLoginState] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => (userAuth ? setUserLoginState(true) : setUserLoginState(false)));

    return () => {
      setUserLoginState(false);
      setShowUserOptions(false);
    };
  }, [user]);

  if (userLoginState) {
    return (
      <button
        type="button"
        className={styles.profileButton}
        onClick={(buttonEvent) => {
          showUserOptions ? setShowUserOptions(false) : setShowUserOptions(true);

          buttonEvent.stopPropagation();

          document.body.addEventListener("click", (documentEvent) => {
            if (!buttonEvent.target.contains(documentEvent.target)) setShowUserOptions(false);
            document.body.removeEventListener("click", null);
          });
        }}
      >
        <div className={styles.profileImageContainer}>
          <Image
            src={`${user?.photoURL || auth.currentUser.photoURL || "/defaultUser.png"}`}
            width={30}
            height={30}
            alt="Profile image"
            className={styles.profileImage}
          ></Image>
        </div>

        <BiCaretDown className={styles.caretDownIcon} />

        <div
          id="userOptionsContainerId"
          className={`${styles.userOptionsContainer} ${showUserOptions && styles.showUserOptions}`}
        >
          <h3 className={styles.userOptionsTitle}>{user?.displayName}</h3>
          <Link href="/profile">
            <a className={styles.userOptionContainer}>
              <BiCog className={styles.userOptionIcon} />
              <span className={styles.userOptionText}>Preferences</span>
            </a>
          </Link>

          {/* <Link href="/login">
            <a className={styles.userOptionContainer}>
              <BiCaretDown className={styles.userOptionIcon} />
              <span className={styles.userOptionText}>Whatever</span>
            </a>
          </Link> */}

          <div
            className={styles.userOptionContainer}
            onClick={() => {
              auth.signOut();
              router.push("/");
            }}
          >
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
