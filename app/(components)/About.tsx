"use client";
import React, { useState } from "react";
import styles from "@/app/styles/About.module.css";

const sections = [
    {
        title: "Education & Interests",
        content: [
            "University: MAKAUT, B.Tech in CSE",
            "Interests: AI, ML, DL, Web Dev, etc",
            "Mindset: Curious, driven, growth-oriented",
        ],
    },
    {
        title: "Technical Skills",
        content: [
            "Languages: Python, JavaScript, TypeScript, etc",
            "Frameworks: Next.js, PyTorch, TensorFlow, etc",
            "Expertise: Machine Learning, Deep Learning, Web Development",
        ],
    },
    {
        title: "Highlighted Projects",
        content: [
            "AI-driven Jewelry Recommendation System",
            "Autocomplete AI for Story Generation",
            "Image Colorization Using GAN",
            "Rock-Paper-Scissors Game using Real-Time Gesture Detection and classification",
            "Offline-First Web App using PWA in Next.js",
        ],
    },
    {
        title: "Goals & Aspirations",
        content: [
            "Contribute to real-world AI innovations",
            "Make tech education accessible for all",
            "Develop AI tools for safety, health & learning",
        ],
    },
    {
        title: "Traits & Hobbies",
        content: [
            "Traits: Detail-oriented, self-motivated, collaborative",
            "Creative Edge: Enjoys art, gaming, and building immersive tech",
        ],
    },
];

const About: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleSection = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <section className={styles.container} id="about">
            <div className={styles.header}>
                <h2 className={styles.title}>About Me</h2>
                <p className={styles.subtitle}>
                    Passionate Computer Science & Engineering student with a focus on AI innovation and impactful development.
                </p>
            </div>

            <div className={styles.accordionWrapper}>
                {sections.map((section, index) => (
                    <div
                        className={`${styles.accordion} ${openIndex === index ? styles.active : ""}`}
                        key={index}
                    >
                        <button
                            className={styles.accordionHeader}
                            onClick={() => toggleSection(index)}
                        >
                            {section.title}
                            <span>{openIndex === index ? "−" : "+"}</span>
                        </button>

                        <ul className={styles.accordionContent}>
                            {section.content.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default About;
