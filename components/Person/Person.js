import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import instance from "../axios";

import MovieLoading from "../Movie/MovieLoading";
import MovieUnavailable from "../Movie/MovieUnavailable";
import PersonInfo from "./PersonInfo";

function Person() {
  const [personResults, setPersonResults] = useState({});
  const [isApiSubscribed, setIsApiSubscribed] = useState(true);
  const [personLoaded, setPersonLoaded] = useState(false);
  const [personUnavailable, setPersonUnavailable] = useState(false);

  const router = useRouter();
  const { personId } = router.query;

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    const personDetailsRequests = [
      `/person/${personId}?api_key=${process.env.API_KEY}&language=en-US`,
      `/person/${personId}/combined_credits?api_key=${process.env.API_KEY}&language=en-US`,
      `/person/${personId}/images?api_key=${process.env.API_KEY}`,
      `/person/${personId}/tagged_images?api_key=${process.env.API_KEY}`,
      `/person/popular?api_key=${process.env.API_KEY}&language=en-US&page=${Math.floor(Math.random() * 100)}`,
    ];

    function fetchPerson() {
      Promise.all(
        personDetailsRequests.map(
          async (request) =>
            await instance.get(request, {
              cancelToken: source.token,
            })
        )
      )
        .then((res) => {
          if (isApiSubscribed) {
            res.map((personResult, index) => {
              switch (index) {
                case 0:
                  personResults.details = personResult.data;
                  break;
                case 1:
                  personResults.credits = personResult.data;
                  break;
                case 2:
                  personResults.images = personResult.data;
                  break;
                case 3:
                  personResults.taggedImages = personResult.data;
                  break;
                case 4:
                  personResults.popular = personResult.data;
                  break;
                default:
                  break;
              }
              setPersonResults({ ...personResults });
            });
            setPersonLoaded(true);
          }
        })
        .catch(() => setPersonUnavailable(true));
    }

    if (personId) fetchPerson();

    return () => {
      setIsApiSubscribed(false);
      source.cancel("Request canceled.");
    };
  }, [personId]);

  return (
    <>
      <Head>
        <title>
          YMDB-
          {personResults?.details?.name ||
            personResults?.details?.title ||
            personResults?.details?.original_title}
        </title>
      </Head>
      <main>
        {personUnavailable ? (
          <MovieUnavailable />
        ) : personLoaded ? (
          <PersonInfo personResults={personResults} />
        ) : (
          <MovieLoading />
        )}
      </main>
    </>
  );
}

export default Person;
