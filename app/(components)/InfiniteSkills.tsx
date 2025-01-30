"use client";
import styles from "@/app/styles/InfiniteSkills.module.css";
import { useEffect, useRef } from "react";

const InfiniteSkills = () => {
    const skills = ["Next Js", "React Js", "Python", "C++", "Java", "JavaScript", "TypeScript", "Tensorflow", "AI/ML"];
    const ulRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        if (!ulRef.current) return;

        const ul = ulRef.current;
        let animationFrame: number;
        let scrollAmount = 0;

        const scrollMarquee = () => {
            scrollAmount += 1;
            if (scrollAmount >= ul.scrollWidth / 2) {
                scrollAmount = 0;
            }
            ul.scrollLeft = scrollAmount;
            animationFrame = requestAnimationFrame(scrollMarquee);
        };

        animationFrame = requestAnimationFrame(scrollMarquee);

        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        <div className={styles.container}>
            <span className={styles.fake_left} />
            <ul className={styles.ul} ref={ulRef} aria-hidden="true">
                {skills.concat(skills).map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>
            <span className={styles.fake_right} />
        </div>
    );
};

export default InfiniteSkills;
