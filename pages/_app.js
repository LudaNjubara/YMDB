import { useEffect } from "react";
import { auth } from "../components/firebase";
import { Provider, useDispatch } from "react-redux";
import { login, logout } from "../components/redux/userSlice";
import store from "../components/redux/store";
import RestrictionGuard from "../components/RestrictionGuard";
import Navbar from "../components/Reusable/Navbar/Navbar";
import Footer from "../components/Reusable/Footer";
import "../styles/globals.css";

export default function AppWrapper({ Component, pageProps }) {
  function App() {
    const dispatch = useDispatch();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          // User is currently logged in
          dispatch(
            login({
              uid: userAuth.uid,
              email: userAuth.email,
              displayName: userAuth.displayName,
            })
          );
        } else {
          // User is currently not logged in
          dispatch(logout());
        }
      });
      return unsubscribe;
    }, [dispatch]);
    return (
      <>
        <Navbar />
        <RestrictionGuard>
          <Component {...pageProps} />
        </RestrictionGuard>
        <Footer />
      </>
    );
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
