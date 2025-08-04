import React, { useState } from "react";
import styles from "./Tabs.module.scss";
import { RxExit } from "react-icons/rx";
import clsx from 'clsx'



const Tabs = () => {
  const [activeTab, setActiveTab] = useState("general");

    return (
    <div className={styles.container}>
      <div className={styles.tabs}>
      <h1>Profile</h1>
      <button
        className={clsx(styles.button ,activeTab === "general" ? styles.active : "")}
        onClick={() => setActiveTab("general")}
      >
        General Information
      </button>
      <button
        className={clsx(styles.button ,activeTab === "purchase" ? styles.active : "")}
        onClick={() => setActiveTab("purchase")}
      >
        Purchase History
      </button>
      </div>
      <div>
          <button className={styles.logOutButton}>
              <RxExit className={styles.logOutIcon} />
              LOG OUT
          </button>
      </div>   
    </div>
  );
};

export default Tabs;
