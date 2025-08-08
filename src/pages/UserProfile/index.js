import React from "react";
import { useState } from "react";
import AvatarCard from "../../components/AvatarCard";
import GeneralInformationForm from "../../components/GeneralInformationForm";
import PurchaseHistory from "../../components/PurchaseHistory";
import Tabs from "../../components/Tabs";
import styles from "./UserProfile.module.scss";
import avatar from "../../assets/DemonSlayer.jpg"

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <div className={styles.background}>
            <div className={styles.tabs}>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === "general" && (
                    <div className={styles.profileContent}>
                    <AvatarCard
                    name="Long Ngo"
                    avatarUrl={avatar}
                    />
                    <GeneralInformationForm
                    fullName="Ngo Bao Long"
                    email="nblong23@clc.fitus.edu.vn"
                    birthday="2005-01-04"
                    phone="0913288527"
                    gender="Male"
                    />
                    </div>
                )}

                {activeTab === "purchase" && (
                    <PurchaseHistory imgSource={avatar}/>
                )}
            </div>
        </div>
  );
};

export default UserProfile;
