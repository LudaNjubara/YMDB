import Head from "next/head";
import Profile from "../components/Profile/Profile";

function profile() {
  return (
    <>
      <Head>
        <title>YMDB-Profile</title>
      </Head>

      <Profile />
    </>
  );
}

export default profile;
