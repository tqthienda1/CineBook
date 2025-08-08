import React from "react";
import { useState } from "react";
import AvatarCard from "../../components/AvatarCard";
import GeneralInformationForm from "../../components/GeneralInformationForm";
import PurchaseHistory from "../../components/PurchaseHistory";
import Transaction from "../../components/Transaction";
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
                    <div className={styles.transaction}>
                        <PurchaseHistory />
                        <Transaction
                            id={'23127219'}
                            title={'Demon Slayer: Kimetsu no Yaiba: Infinity Castle'}
                            imgSource={avatar}
                            date={'July 15, 2025'}
                            time={'7:30 PM'}
                            location={'CineBook Quoc Thanh'}
                        />
                    </div>
                )}
            </div>
        </div>
  );
};

export default UserProfile;
