import React from "react";
import css from "./Contact.module.css";
import { FaUser, FaPhone } from "react-icons/fa";

const Contact = ({ contact, onDelete }) => {
  return (
    <div className={css.container}>
      <div className={css.contactcontainer}>
        <div className={css.conticon}>
          <FaUser className={css.icon} />
          <p>{contact.name}</p>
        </div>
        <div className={css.conticon}>
          <FaPhone className={css.icon} />
          <p>{contact.number}</p>
        </div>
      </div>

      <button className={css.btn} onClick={() => onDelete(contact.id)}>
        Delete
      </button>
    </div>
  );
};
export default Contact;
