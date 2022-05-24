import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import uniqid from "uniqid";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { setDoc, doc, increment, arrayUnion } from "firebase/firestore";
import { database } from "../firebase";
import axios from "../axios";
import { truncate, baseImageURL } from "../Utils/utils";

import styles from "../../styles/Home/hero.module.css";

function Hero({ fetchURL }) {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [movie, setMovie] = useState(null);

  function addToFavourites(id) {
    // update statistics
    setDoc(
      doc(database, "statistics", user.email),
      {
        numOfFavourites: increment(1),
      },
      { merge: true }
    )
      .then((doc) => {
        console.log(doc);
      })
      .catch((error) => {
        console.log(error);
      });

    // add to favourites
    setDoc(doc(database, "favourites", user.email), { movies: arrayUnion(id) }, { merge: true })
      .then((doc) => {
        console.log(doc);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function initializeAddingToFavourites(id) {
    if (!user) {
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });

      return;
    }

    addToFavourites(id);
  }

  useEffect(() => {
    async function fetchMovieData() {
      const req = await axios.get(fetchURL);
      const randomMovieIndex = Math.floor(Math.random() * req.data.results.length);
      setMovie(req.data.results[randomMovieIndex]);

      return () => {
        setMovie(null);
      };
    }
    fetchMovieData();
  }, [fetchURL]);

  return (
    <section className={styles.hero}>
      <article className={styles.heroContent}>
        <h1 className={styles.heroTitle}> {movie?.name || movie?.title || movie?.original_name}</h1>
        <div className={styles.heroButtonContainer}>
          <button
            type="button"
            className={styles.heroButton}
            onClick={() => initializeAddingToFavourites(movie.id)}
          >
            Add to favourites
          </button>
          <Link href={`/movies/${encodeURIComponent(movie?.id)}`} key={uniqid()}>
            <a className={styles.heroButton}>Show info</a>
          </Link>
        </div>
        <p className={styles.heroDescription}>{truncate(movie?.overview, 338)}</p>
      </article>
      <article className={styles.heroImageContainer}>
        <Image
          src={`${baseImageURL}${movie?.backdrop_path}`}
          alt={movie?.name}
          className={styles.heroImage}
          key={uniqid()}
          width={1500}
          height={900}
          priority={true}
        />
      </article>
    </section>
  );
}

export default Hero;
