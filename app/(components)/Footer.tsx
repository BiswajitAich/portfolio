"use client";
import { useEffect, useState } from "react";
import styles from "@/app/styles/Footer.module.css";
import Link from "next/link";
import Theme from "./Theme";
import Email from "./(contact)/Email";

const Footer = () => {
    const [div, setDiv] = useState<number>(0);
    const [displayEmail, setDisplayEmail] = useState<boolean>(false);
    useEffect(() => {
        const measureWidth = () => {
            const w = window.innerWidth;
            const num = w / 50;
            setDiv(Math.round(num));
        };
        measureWidth();
        window.addEventListener("resize", measureWidth);
        return () => window.removeEventListener("resize", measureWidth);
    }, []);



    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const handleEmailDisplay=(display: boolean)=>{
        setDisplayEmail(display);
    }

    return (
        <footer className={styles.footer} id="footer">
            <div className={styles.fake_div}>
                {Array.from({ length: div }, (_, index) => {
                    const randomHeight = Math.round(Math.random() * (150 - 50));
                    return (
                        <span
                            key={index}
                            className={styles.fake}
                            style={{
                                height: `${randomHeight}px`,
                                top: `${-1 * (randomHeight - 2)}px`,
                            }}
                        />
                    );
                })}
            </div>
            <div />
            <div className={styles.foo_container}>
                <Theme />
                <div className={styles.column}>
                    <h4>Navigation</h4>
                    <ul>
                        <li><Link href="#home">Home</Link></li>
                        <li><Link href="#about">About Me</Link></li>
                        <li><Link href="#education">Education</Link></li>
                        <li><Link href="#projects">Projects</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Built With</h4>
                    <ul>
                        <li>Next.js</li>
                        <li>TypeScript</li>
                        <li>CSS</li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Social Media Links</h4>
                    <ul>
                        <li>
                            <Link href="https://github.com" target="_blank">
                                GitHub
                            </Link>
                        </li>
                        <li>
                            <Link href="https://instagram.com" target="_blank">
                                Instagram
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Contact Me</h4>
                    <button className={styles.contact_btn} onClick={()=>setDisplayEmail(true)}>Click here to Mail me!</button>
                </div>

                <div className={styles.column}>
                    <p className={styles.tagline}>
                        Aiming to create a better future through technology.
                    </p>
                    <p>© {new Date().getFullYear()} Biswajit Aich. All rights reserved.</p>
                    <button className={styles.top_btn} onClick={scrollToTop}>
                        Back to Top
                    </button>
                </div>
            </div>
            {displayEmail ? (<Email clicked={handleEmailDisplay} />) : null}
        </footer>
    );
};

export default Footer;