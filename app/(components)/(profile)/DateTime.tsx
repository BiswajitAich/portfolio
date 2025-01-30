"use client"
import { useEffect, useState } from "react";
import styles from "@/app/styles/profile/DateTime.module.css"
const DateTime = () => {
    const [dateTime, setDateTime] = useState<string[]>([])
    useEffect(() => {
        const updateDateTime = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            let hours = date.getHours();
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
            const formattedTime = `${hours}:${minutes} ${ampm}`;
            setDateTime([`${year}`, `${day}/${month}`, `${formattedTime}`])
        }
        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);
        return () => clearInterval(interval)
    }, [])
    return (
        <div className={styles.date}>
            <div className={styles.year}>{dateTime[0]}</div>
            <div>
                <span>{dateTime[1]}</span>
                <br />
                <span>{dateTime[2]}</span>
            </div>
        </div>
    );
}

export default DateTime;