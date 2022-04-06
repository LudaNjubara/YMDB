import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "./firebase";

function RestrictionGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // hide restricted page content by default
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // Run authCheck on route change
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect user to login if accessing a restricted page without logging in first
    const privatePaths = ["/profile"];
    const path = url.split("?")[0];

    if (!auth.currentUser && privatePaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else setAuthorized(true);
  }

  return authorized && children;
}

export default RestrictionGuard;
