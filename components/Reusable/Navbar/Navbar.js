import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../../styles/Reusable/navbar.module.css";
import NavbarButton from "./NavbarButton";

function Navbar() {
  const [show, setShow] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (isMounted) {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 100) return show ? null : setShow(true);
        else setShow(false);
      });
    }

    return () => {
      window.removeEventListener("scroll", null);
      setShow(false);
      setIsMounted(false);
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
