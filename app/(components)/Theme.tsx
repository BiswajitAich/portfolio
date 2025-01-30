"use client";
import styles from "@/app/styles/Theme.module.css";
import { useTheme } from "../context/ThemeProvider";

export default function Theme() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className={styles.theme_div}>
            <span style={{ transform: `${theme === 'light' ? 'translateX(-50px)' : 'translateX(50px)'}` }}>
                {theme === 'light' ? '🌞' : '🌙'}
            </span>
        </button>
    );
}
