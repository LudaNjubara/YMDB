import Link from "next/link";
import Image from "next/image";

import { BiMovie } from "react-icons/bi";
import {
  BsInstagram,
  BsTwitter,
  BsFacebook,
  BsReddit,
  BsChevronRight,
  BsEnvelopeFill,
  BsTelephoneFill,
} from "react-icons/bs";
import {
  RiTvFill,
  RiUser3Fill,
  RiDatabase2Fill,
  RiMovie2Fill,
  RiSearchFill,
  RiSpeedFill,
} from "react-icons/ri";

import styles from "../../styles/Reusable/footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <section className={styles.footerJoinUsContainer}>
          <Link href="/">
            <a className={styles.footerLogoWrapper}>
              <span className={styles.footerLogo}>
                <Image src="/logo.svg" width="27" height="27" alt="Footer Logo" />
                MDB
              </span>
              <span className={styles.footerLogoText}>Your Movie Database</span>
            </a>
          </Link>
          <div className={styles.footerJoinUsContainerInner}>
            <Link href="/login">
              <a className={styles.joinUsButton}>Join Us</a>
            </Link>
            <p className={styles.footerJoinUsDescription}>
              Haven&apos;t joined us yet? Now&apos;s your chance. Click the button above and enter the world
              of movies!
            </p>
          </div>
        </section>
        <section className={styles.footerSectionContainer}>
          <article className={styles.footerSection}>
            <div>
              <h2 className={styles.sectionTitle}>Social</h2>
              <p className={styles.sectionTitleDescription}>Join the discussion</p>
            </div>
            <div className={styles.sectionContent}>
              <a href="https://www.instagram.com/">
                <BsInstagram className={styles.socialIcon} />
              </a>
              <a href="https://twitter.com/">
                <BsTwitter className={styles.socialIcon} />
              </a>
              <a href="https://www.facebook.com/">
                <BsFacebook className={styles.socialIcon} />
              </a>
              <a href="https://www.reddit.com">
                <BsReddit className={styles.socialIcon} />
              </a>
            </div>
          </article>

          <article className={styles.footerSection}>
            <div>
              <h2 className={styles.sectionTitle}>FAQs</h2>
              <p className={styles.sectionTitleDescription}>All your answers in one place</p>
            </div>
            <div className={styles.sectionContent}>
              <a href="#!" className={styles.sectionLink}>
                How to view movie information?
              </a>
              <a href="#!" className={styles.sectionLink}>
                Images not appearing properly?
              </a>
              <a href="#!" className={styles.sectionLink}>
                How to change profile image?
              </a>
              <a href="#!" className={styles.moreAnswersButton}>
                More answers <BsChevronRight className={styles.chevronRightIcon} />
              </a>
            </div>
          </article>

          <article className={styles.footerSection}>
            <div>
              <h2 className={styles.sectionTitle}>Legal</h2>
              <p className={styles.sectionTitleDescription}>Info about our service</p>
            </div>
            <div className={styles.sectionContent}>
              <a href="#!" className={styles.sectionLink}>
                About Us
              </a>
              <a href="#!" className={styles.sectionLink}>
                Terms & Conditions
              </a>
              <a href="#!" className={styles.sectionLink}>
                Privacy Policy
              </a>
              <a href="#!" className={styles.sectionLink}>
                Job Applications
              </a>
            </div>
          </article>

          <article className={styles.footerSection}>
            <div>
              <h2 className={styles.sectionTitle}>Support</h2>
              <p className={styles.sectionTitleDescription}>We&apos;re here to help</p>
            </div>
            <div className={styles.sectionContent}>
              <a href="#!" className={styles.sectionLink}>
                <BsEnvelopeFill className={styles.supportIcon} /> support-ymdb@gmail.com
              </a>
              <a href="#!" className={styles.sectionLink}>
                <BsTelephoneFill className={styles.supportIcon} /> +385 91-4761-903
              </a>
            </div>
          </article>
        </section>
        <section className={styles.copyrightContainer}>
          <p>&copy;Copyright by YMDB. All rights reserved.</p>
          <p>Made by Mihael Šestak</p>
        </section>
      </div>
      <div className={styles.footerBgContainer}>
        <Image src="/footer_bg.svg" priority={true} layout="fill" className={styles.footerWave} />
      </div>
      <div className={styles.footerBgIconsContainer}>
        <RiTvFill className={styles.footerBgIcon} />
        <RiUser3Fill className={styles.footerBgIcon} />
        <RiDatabase2Fill className={styles.footerBgIcon} />
        <RiMovie2Fill className={styles.footerBgIcon} />
        <RiSearchFill className={styles.footerBgIcon} />
        <RiSpeedFill className={styles.footerBgIcon} />
        <BiMovie className={styles.footerBgIcon} />
      </div>
    </footer>
  );
}

export default Footer;
