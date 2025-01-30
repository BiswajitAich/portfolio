"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/styles/profile/ProfilePic.module.css";
import profile from "@/public/static/profile.png";
import isMobile from "@/app/js/isMobile";
import dynamic from "next/dynamic";
import Link from "next/link";
const DateTime = dynamic(() => import("./DateTime"));
const Email = dynamic(() => import("../(contact)/Email"));

const ProfilePic = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isMobileDevice, setIsMobileDevice] = useState<boolean>(true);
    const [displayEmail, setDisplayEmail] = useState<boolean>(false);

    useEffect(() => {
        setIsMobileDevice(() => isMobile());
    }, []);

    const mousePosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isMobileDevice) return;
        const x = e.clientX;
        const y = e.clientY;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        if (rect.top < 100) return;

        const midX = window.innerWidth / 2;
        const midY = window.innerHeight / 2;

        const offsetX = ((x - midX) / midX) * 35;
        const offsetY = ((y - midY) / midY) * 35;

        containerRef.current.style.transform = `rotateX(${offsetY * -1}deg) rotateY(${offsetX}deg)`;

        if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
            resetTimeoutRef.current = null;
        }
    };

    const resetPosition = () => {
        if (isMobileDevice) return;

        resetTimeoutRef.current = setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
            }
            resetTimeoutRef.current = null;
        }, 1000)
    };

    const handleDisplayEmail = (display: boolean) => {
        setDisplayEmail(display);
    }
    return (
        <div className={styles.parent_container}>
            <DateTime />
            <div
                className={styles.m_container}
                ref={containerRef}
                onMouseMove={(e) => mousePosition(e)}
                onMouseLeave={resetPosition}
            >
                <div className={styles.container}>
                    <div className={styles.img_container}>
                        <div className={styles.card} />
                        <div className={styles.img_div}>
                            <Image
                                src={profile}
                                height={384}
                                width={288}
                                alt="profile image"
                                priority
                                quality={25} 
                                placeholder="blur"
                                blurDataURL={profile.blurDataURL}
                            />
                        </div>
                    </div>
                    <div className={styles.m_txt_container}>
                        <div className={styles.txt_container}>
                            <h2>Hello!</h2>
                            <h1>I am Biswajit Aich.</h1>
                            <p>Building Future with code & AI</p>
                            <div className={styles.btns}>
                                <Link className={styles.btn} href={"/Resume"}>View Resume</Link>
                                <button className={styles.btn} onClick={() => setDisplayEmail(true)}>Email me</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {displayEmail ? (<Email clicked={handleDisplayEmail} />) : null}
        </div>
    );
};

export default ProfilePic;
