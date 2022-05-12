import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import uniqid from "uniqid";
import axios from "../axios";
import { truncate, baseImageURL } from "../Utils/utils";

import styles from "../../styles/Home/hero.module.css";

function Hero({ fetchURL }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieData() {
      const req = await axios.get(fetchURL);
      const randomMovieIndex = Math.floor(Math.random() * req.data.results.length);
      setMovie(req.data.results[randomMovieIndex]);
      return req;
    }
    fetchMovieData();
  }, [fetchURL]);

  return (
    <section className={styles.hero}>
      <article className={styles.heroContent}>
        <h1 className={styles.heroTitle}> {movie?.name || movie?.title || movie?.original_name}</h1>
        <div className={styles.heroButtonContainer}>
          <button type="button" className={styles.heroButton}>
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
