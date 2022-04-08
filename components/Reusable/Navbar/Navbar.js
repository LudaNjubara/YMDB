import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../../styles/Reusable/navbar.module.css";
import NavbarButton from "./NavbarButton";

function Navbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 100) {
        if (show === false) setShow(true);
        else return;
      } else setShow(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
      setShow(false);
    };
  }, []);

  return (
    <header className={`${styles.header} ${show && styles.show}`}>
      <div className={styles.headerContainer}>
        <Link href="/">
          <a className={styles.logo}>YMDB</a>
        </Link>

        <div>
          <input type="text" className={styles.searchInput} placeholder="Search your favourite movies..." />
        </div>

        <div className={styles.userActionContainer}>{<NavbarButton />}</div>
      </div>
    </header>
  );
}

export default Navbar;
