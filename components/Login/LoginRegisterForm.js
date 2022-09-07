import { useRef } from "react/";
import { useRouter } from "next/router";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "../firebase";

import styles from "../../styles/Login/loginRegisterForm.module.css";

function LoginRegisterForm() {
  const usernameRefRegister = useRef("");
  const emailRefRegister = useRef("");
  const passwordRefRegister = useRef("");
  const emailRefLogin = useRef("");
  const passwordRefLogin = useRef("");
  const router = useRouter();

  function changeForm() {
    const formsContainer = document.querySelector(`.${styles.formsContainer}`);
    const loginForm = document.getElementById("loginFormId");
    const registerForm = document.getElementById("registerFormId");

    if (loginForm.classList.contains(styles.active)) {
      formsContainer.style.height = `${registerForm.clientHeight}px`;
    } else {
      formsContainer.style.height = `${loginForm.clientHeight}px`;
    }

    registerForm.classList.toggle(styles.active);
    loginForm.classList.toggle(styles.active);
  }

  const login = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, emailRefLogin.current.value, passwordRefLogin.current.value)
      .then((userCredential) => {
        // Logged in
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch((error) => {
        console.error(error.message, error.code);
      });
  };

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, emailRefRegister.current.value, passwordRefRegister.current.value)
      .then((userCredential) => {
        // Account created
        const user = userCredential.user;

        updateProfile(user, {
          displayName: usernameRefRegister.current.value,
        })
          .then(() => {
            const returnUrl = router.query.returnUrl || "/";
            router.push(returnUrl);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.error(error.message, error.code); // remove console logging and display message to user
      });
  };

  function validateForm(e, fromForm) {
    const usernameErrorContainer = document.getElementById("errorContainer_username");
    const emailErrorContainer = document.getElementById("errorContainer_email");
    const passwordErrorContainer = document.getElementById("errorContainer_password");
    const newEmailErrorCOntainer = document.getElementById("errorContainer_newEmail");
    const newPasswordErrorContainer = document.getElementById("errorContainer_newPassword");

    const removeShownErrors = () => {
      setTimeout(() => {
        usernameErrorContainer.classList.remove(styles.showError);
        emailErrorContainer.classList.remove(styles.showError);
        passwordErrorContainer.classList.remove(styles.showError);
        newEmailErrorCOntainer.classList.remove(styles.showError);
        newPasswordErrorContainer.classList.remove(styles.showError);
      }, 5000);
    };

    const showErrors = (inputType, message) => {
      switch (inputType) {
        case "email":
          emailErrorContainer.classList.add(styles.showError);
          emailErrorContainer.innerHTML = message;
          break;
        case "password":
          passwordErrorContainer.classList.add(styles.showError);
          passwordErrorContainer.innerHTML = message;
          break;
        case "username":
          usernameErrorContainer.classList.add(styles.showError);
          usernameErrorContainer.innerHTML = message;
          break;
        case "newEmail":
          newEmailErrorCOntainer.classList.add(styles.showError);
          newEmailErrorCOntainer.innerHTML = message;
          break;
        case "newPassword":
          newPasswordErrorContainer.classList.add(styles.showError);
          newPasswordErrorContainer.innerHTML = message;
          break;
        default:
          break;
      }

      removeShownErrors();
    };

    if (fromForm === "login") {
      // check if email is valid
      if (!emailRefLogin.current.value) {
        showErrors("email", "Please enter an email");
        return;
      }
      if (!emailRefLogin.current.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showErrors("email", "Please enter a valid email");
        return;
      }

      // check if password is valid
      if (!passwordRefLogin.current.value) {
        showErrors("password", "Please enter a password");
        return;
      }
      if (passwordRefLogin.current.value.length < 6) {
        showErrors("password", "Password must be at least 6 characters long");
        return;
      }

      login(e);
    } else {
      // check if username is valid
      if (!usernameRefRegister.current.value) {
        showErrors("username", "Please enter a username");
        return;
      }
      if (usernameRefRegister.current.value.length < 2) {
        showErrors("username", "Username must be at least 2 characters long");
        return;
      }

      // check if email is valid
      if (!emailRefRegister.current.value) {
        showErrors("newEmail", "Please enter an email");
        return;
      }
      if (!emailRefRegister.current.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showErrors("newEmail", "Please enter a valid email");
        return;
      }

      // check if password is valid
      if (!passwordRefRegister.current.value) {
        showErrors("newPassword", "Please enter a password");
        return;
      }
      if (passwordRefRegister.current.value.length < 6) {
        showErrors("newPassword", "Password must be at least 6 characters long");
        return;
      }

      register(e);
    }
  }

  return (
    <section className={styles.formsContainer}>
      <article id="loginFormId" className={`${styles.loginContainer} ${styles.active}`}>
        <form className={styles.form}>
          <h1 className={styles.formTitle}>Login</h1>
          <label htmlFor="emailInputLogin">
            <span id="errorContainer_email" className={styles.errorContainer}></span>
            <input
              ref={emailRefLogin}
              type="email"
              id="emailInputLogin"
              placeholder="Your e-mail address"
              autoFocus
              className={styles.formInput}
            />
          </label>
          <label htmlFor="passwordInputLogin">
            <span id="errorContainer_password" className={styles.errorContainer}></span>
            <input
              ref={passwordRefLogin}
              type="password"
              id="passwordInputLogin"
              placeholder="Your password"
              autoComplete="current-password"
              className={styles.formInput}
            />
          </label>
          <button
            type="button"
            className={`${styles.formButton} ${styles.formButtonLogin}`}
            onClick={(e) => validateForm(e, "login")}
          >
            Login
          </button>
          <p className={styles.formRegisterText}>
            Don&apos;t have an account? Create it over
            <span className={styles.formChangeToRegisterButton} tabIndex="0" onClick={changeForm}>
              here
            </span>
          </p>
        </form>
      </article>

      <article id="registerFormId" className={styles.registerContainer}>
        <form className={styles.form}>
          <h1 className={styles.formTitle}>Create Account</h1>
          <label htmlFor="usernameInputRegister">
            <span id="errorContainer_username" className={styles.errorContainer}></span>
            <input
              ref={usernameRefRegister}
              type="text"
              id="usernameInputRegister"
              placeholder="New username"
              className={styles.formInput}
            />
          </label>
          <label htmlFor="emailInputRegister">
            <span id="errorContainer_newEmail" className={styles.errorContainer}></span>
            <input
              ref={emailRefRegister}
              type="email"
              id="emailInputRegister"
              placeholder="New e-mail address"
              className={styles.formInput}
            />
          </label>
          <label htmlFor="passwordInputRegister">
            <span id="errorContainer_newPassword" className={styles.errorContainer}></span>
            <input
              ref={passwordRefRegister}
              type="password"
              id="passwordInputRegister"
              autoComplete="new-password"
              placeholder="New password"
              className={styles.formInput}
            />
          </label>
          <button
            type="button"
            className={`${styles.formButton} ${styles.formButtonRegister}`}
            onClick={(e) => validateForm(e, "register")}
          >
            Create Account
          </button>

          <p className={styles.formRegisterText}>
            Already have an account? Go back to login
            <span className={styles.formChangeToRegisterButton} tabIndex="0" onClick={changeForm}>
              here
            </span>
          </p>
        </form>
      </article>
    </section>
  );
}

export default LoginRegisterForm;
