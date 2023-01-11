import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import GuestBookList from "./GuestbookList";
import styles from "./component.module.css"

function GuestBook() {
  /* Checks if any previous signin at local storage */
  const multiStorageFromLocal = JSON.parse(localStorage.getItem("signIn"));
  let multiStorage = multiStorageFromLocal ? multiStorageFromLocal : [];

  /* Input control */
  const schema = yup.object().shape({
    name: yup.string().min(4).max(30).required(),
    greeting: yup.string().min(10).max(300).required(),
  });

  /*useform/state definition */
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const [notInUse, setUpdatedObject] = useState(multiStorage);

  /* Store submitted input in local storage */
  const onSubmit = (info) => {
    multiStorage.push(info);
    info.time = new Date().toLocaleDateString("no-NO");
    localStorage.setItem("signIn", JSON.stringify(multiStorage));
    let newRender = { ...multiStorage };
    setUpdatedObject(newRender);
  };

  /* Returns input form for DOM */
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className={styles.counttext}> Want to write a greeting?</h3>
          <input type="text" placeholder="Your name" {...register("name")} />
          <input
            type="text"
            placeholder="Write your greeting here"
            {...register("greeting")}
          />
          <input type="submit" value="Send in" />
        </form>
      </div>
      <GuestBookList objectRender={multiStorage} />
    </div>
  );
}

export default GuestBook;