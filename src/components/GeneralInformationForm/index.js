import React from 'react';
import styles from './GeneralInformationForm.module.scss';
import { FaUserEdit } from 'react-icons/fa';

const GeneralInformationForm = ({ fullName, email, birthday, phone, gender }) => {
  return (
    <div className={styles.generalInfo}>
      <div className={styles.header}>
        <div>
          <h3>General Information</h3>
          <h4>View all your profile details here.</h4>
        </div>
        <div>
          <FaUserEdit className={styles.editButton} />
        </div>
      </div>
      <form>
        <div className={styles.formGroup}>
          <label>Full Name</label>
          <input type="text" value={fullName} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" value={email} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>Birthday</label>
          <input type="text" value={birthday} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input type="text" value={phone} readOnly />
        </div>
      </form>
    </div>
  );
};

export default GeneralInformationForm;
