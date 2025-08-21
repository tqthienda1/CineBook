import React, { useState, useEffect } from 'react';
import AvatarCard from '../../components/AvatarCard';
import GeneralInformationForm from '../../components/GeneralInformationForm';
import PurchaseHistory from '../../components/PurchaseHistory';
import Transaction from '../../components/Transaction';
import Tabs from '../../components/Tabs';
import styles from './UserProfile.module.scss';
import avatar from '../../assets/DemonSlayer.jpg';
import FilterPurchaseHistory from '../../components/FilterPurchaseHistory';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5003/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const purchaseData = [
    {
      id: '23127219',
      title: 'Demon Slayer: Kimetsu no Yaiba: Infinity Castle',
      imgSource: avatar,
      date: 'July 15, 2025',
      time: '7:30 PM',
      location: 'CineBook Quoc Thanh',
    },
    {
      id: '23127220',
      title: 'Your Name',
      imgSource: avatar,
      date: 'July 20, 2025',
      time: '6:00 PM',
      location: 'CineBook Nguyen Trai',
    },
  ];

  return (
    <div className={styles.background}>
      <div className={styles.tabs}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'general' && (
          <div className={styles.profileContent}>
            <AvatarCard name={userData.fullname || ''} avatarUrl={avatar} />
            {userData ? (
              <GeneralInformationForm
                fullName={userData.fullname || ''}
                email={userData.email || ''}
                birthday={userData.birthday || ''}
                phone={userData.phone || ''}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}

        {activeTab === 'purchase' && (
          <div className={styles.transaction}>
            <PurchaseHistory />
            <FilterPurchaseHistory />

            {purchaseData.map((item) => (
              <Transaction
                key={item.id}
                id={item.id}
                title={item.title}
                imgSource={item.imgSource}
                date={item.date}
                time={item.time}
                location={item.location}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
