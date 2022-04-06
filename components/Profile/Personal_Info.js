import styles from "../../styles/Profile/personal_Info.module.css";

function Personal_Info({ user }) {
  function greetUser() {
    const date = new Date();
    const hours = date.getHours();
    const greeting = hours < 12 ? "Good morning" : hours < 18 ? "Good afternoon" : "Good evening";
    return `${greeting}, ${user.displayName}`;
  }

  return (
    <article>
      <h1 className={styles.articleTitle}>{greetUser()}</h1>
    </article>
  );
}

export default Personal_Info;
