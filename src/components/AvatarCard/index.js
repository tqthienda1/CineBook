import React from "react";
import styles from "./AvatarCard.module.scss";
import { FaUser } from "react-icons/fa";

const AvatarCard = ({ name, avatarUrl }) => {
  return (
    <div className={styles.avatarCard}>
      <h2>{name}</h2>
      <div className={styles.avatarImage}>
        <img src={avatarUrl} alt="Avatar" />
      </div>
      <button className={styles.changeAvatar}>
        <FaUser className={styles.userIcon } />
        Change Avatar
      </button>
    </div>
  );
};

export default AvatarCard;
