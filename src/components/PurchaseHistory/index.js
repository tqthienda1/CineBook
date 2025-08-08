import React from "react";
import styles from "./PurchaseHistory.module.scss"
import clsx from 'clsx'
import { LuTicket} from "react-icons/lu";

const PurchaseHistory = () => {
    return (
        <div className={styles.header}>
            <div>
                <h2>Purchase History</h2>
                <p>View and manage your past ticket bookings.</p>
            </div>
        
            <div className={styles.transactionCount}>
                <LuTicket />
                <p>4 Transactions</p>
            </div>
        </div>
    );
};

export default PurchaseHistory;
