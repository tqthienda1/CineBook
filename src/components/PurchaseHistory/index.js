import React from "react";
import styles from "./PurchaseHistory.module.scss"
import clsx from 'clsx'
import { LuTicket, LuFilter } from "react-icons/lu";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PurchaseHistory = ({ imgSource }) => {
    return (
        <div className={styles.container}>
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
            <div className={styles.filterContainer}>
                <div className={styles.filters}>
                    <LuFilter />
                    <p>Filters</p>
                </div>
                <div className={styles.filterContent}>
                    
                    <div>
                        <p>Search</p>  
                        <input className={styles.box}
                        type="text"
                        placeholder="Search movies, theaters or transaction ID..."
                        />
                    </div>
                    <div>
                        <p>Payment Status</p>  
                        <select className={styles.box}>
                            <option>All Statuses</option>
                            <option>Paid</option>
                            <option>Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <p>Date Range</p>
                        <select className={styles.box}>
                            <option>All time</option>
                            <option>Last 30 days</option>
                            <option>This year</option>
                        </select>
                    </div> 
                </div>
            </div>

            <div className={styles.transactionContainer}>
                <img src={imgSource}
                    alt='Movie image'
                />
                <div>
                    <div>
                        <h2>Demon Slayer: Kimetsu no Yaiba Infinity Castle</h2>
                        <p>Transaction ID: 23127219</p>
                    </div>
                    <div className={styles.transactionDetails}>
                        <div className={styles.detailIcon}>
                            <FaCalendarAlt />
                            <div className={styles.textBox}>
                                <p1>July 15, 2025</p1>
                                <p>Show date</p>
                            </div>
                        </div>
                        <div className={styles.detailIcon}>
                            <FaRegClock />
                            <div className={styles.textBox}>
                                <p1>7:30</p1>
                                <p>Showtime</p>
                            </div>
                        </div>
                        <div className={styles.detailIcon}>
                            <FaLocationDot/>
                            <p1 className={styles.textBox}>
                                CineBook Quoc Thanh
                            </p1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistory;
