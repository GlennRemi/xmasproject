import styles from "./component.module.css";

/* Renders input from local storage to DOM  */
function GuestBookList(props) {
  return (
    <div className={styles.spacing}>
      {props.objectRender.map((responde, i) => (
        <div className={`${styles.card} ${styles.guestbox}`} key={i}>
          <h3 className={styles.greet}>Greeting from: {responde.name}<h3/>
          <p className={styles.greet}>{responde.greeting}</p>
          <p className={styles.small}>[{responde.time}]</p> 
          </h3>
        </div>
      ))}
    </div>
  );
}

export default GuestBookList;