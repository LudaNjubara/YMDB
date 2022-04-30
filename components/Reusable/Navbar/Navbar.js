import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import uniqid from "uniqid";
import instance from "../../axios";
import styles from "../../../styles/Reusable/navbar.module.css";
import NavbarButton from "./NavbarButton";
import { truncate, baseImageURL } from "../../Home/Row";
import { BsStarFill, BsCalendar3 } from "react-icons/bs";

function Navbar() {
  const [show, setShow] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [filteredResultsFinal, setFilteredResultsFinal] = useState(null);
  const searchInputRef = useRef(null);
  let filteredResults = { movies: [], series: [], people: [] };
  let searchDelayTimer;

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  function search(query) {
    clearTimeout(searchDelayTimer);
    searchDelayTimer = setTimeout(async () => {
      if (query) {
        const searchURL = `/search/multi?api_key=${
          process.env.API_KEY
        }&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(query)}`;

        await instance
          .get(searchURL, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res);
            setSearchResults(res.data.results);
          })
          .catch((err) => {
            if (axios.isCancel()) {
              console.error(err.message);
            }
          });
      } else {
        setSearchResults(null);
      }
    }, 500);
  }

  function formatDate(date) {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    return year;
  }

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

  useEffect(() => {
    if (searchResults) {
      searchResults.map((result) => {
        switch (result.media_type) {
          case "movie":
            filteredResults.movies.push(result);
            break;
          case "tv":
            filteredResults.series.push(result);
            break;
          default:
            filteredResults.people.push(result);
            break;
        }
      });
    }

    setFilteredResultsFinal(filteredResults);
  }, [searchResults]);

  return (
    <header className={`${styles.header} ${show && styles.show}`}>
      <div className={styles.headerContainer}>
        <Link href="/">
          <a className={styles.logo}>YMDB</a>
        </Link>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search your favourite movies..."
            ref={searchInputRef}
            onChange={() => search(searchInputRef.current.value)}
          />
          {searchResults && (
            <section className={styles.searchResultsContainer}>
              {filteredResultsFinal.movies.length > 0 && (
                <article className={styles.articleSearchResults}>
                  <h3>Movies</h3>
                  {filteredResultsFinal?.movies.map((movie) => {
                    return (
                      <Link href={`/movies/${encodeURIComponent(movie.id)}`} key={uniqid()}>
                        <div className={styles.resultContainer}>
                          <div className={styles.resultImageContainer}>
                            <Image
                              className={styles.resultImage}
                              src={`${baseImageURL}${movie.poster_path}`}
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII="
                              alt={movie.name || movie.title || movie.original_title}
                              width={120}
                              height={200}
                              objectFit="cover"
                            />
                          </div>
                          <div className={styles.resultContent}>
                            <h4 className={styles.resultTitle}>{movie.title}</h4>
                            <p className={styles.resultDescription}>{truncate(movie.overview, 180)}</p>
                          </div>
                          <div className={styles.resultVoteAndDateContainer}>
                            <div className={styles.resultDateContainer}>
                              <p className={styles.resultDateText}>
                                <BsCalendar3 className={styles.serieDateIcon} />
                                {formatDate(movie.release_date)}
                              </p>
                            </div>
                            <div className={styles.resultVoteContainer}>
                              <p className={styles.resultVoteText}>
                                {movie.vote_average} <BsStarFill className={styles.serieVoteIcon} />
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </article>
              )}
              {filteredResultsFinal.series.length > 0 && (
                <article className={styles.articleSearchResults}>
                  <h3>Series</h3>

                  {filteredResultsFinal?.series.map((serie) => {
                    return (
                      <Link href={`/series/${encodeURIComponent(serie.id)}`} key={uniqid()}>
                        <div className={styles.resultContainer}>
                          <div className={styles.resultImageContainer}>
                            <Image
                              className={styles.resultImage}
                              src={`${baseImageURL}${serie.poster_path}`}
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP87wMAAlABTQluYBcAAAAASUVORK5CYII="
                              alt={serie.name || serie.original_name}
                              width={120}
                              height={200}
                              objectFit="cover"
                            />
                          </div>
                          <div className={styles.resultContent}>
                            <h4 className={styles.resultTitle}>{serie.name || serie.original_name}</h4>
                            <p className={styles.resultDescription}>{truncate(serie.overview, 180)}</p>
                          </div>
                          <div className={styles.resultVoteAndDateContainer}>
                            <div className={styles.resultDateContainer}>
                              <p className={styles.resultDateText}>
                                <BsCalendar3 className={styles.serieDateIcon} />
                                {formatDate(serie.first_air_date)}
                              </p>
                            </div>
                            <div className={styles.resultVoteContainer}>
                              <p className={styles.resultVoteText}>
                                {serie.vote_average} <BsStarFill className={styles.serieVoteIcon} />
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </article>
              )}
              {filteredResultsFinal.people.length > 0 && (
                <article className={styles.articleSearchResults}>
                  <h3>People</h3>
                  {filteredResultsFinal?.people.map((person) => {
                    return <p>{person.name}</p>;
                  })}
                </article>
              )}
            </section>
          )}
        </div>

        <div className={styles.userActionContainer}>{<NavbarButton />}</div>
      </div>
    </header>
  );
}

export default Navbar;
