import Head from "next/head";
import LoginRegisterForm from "../components/Login/LoginRegisterForm";

function Login() {
  return (
    <div id="root">
      <Head>
        <title key="title">YMDB - Login or Register</title>
      </Head>
      <LoginRegisterForm />
    </div>
  );
}

export default Login;
