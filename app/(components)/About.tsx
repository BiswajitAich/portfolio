import styles from "@/app/styles/About.module.css";

const About = () => {
    return (
        <section className={styles.container} id="about">
            <h2 className={styles.temp}>About Me</h2>
            <div className={styles.list_div}>
                <p><strong >Personal & Professional Introduction:</strong></p>
                <ul className={styles.list}>
                    <li className={styles.block}><strong>Education:</strong> Passionate Computer Science and Engineering student at MAKAUT University.</li>
                    <li className={styles.block}><strong>Fields of Interest:</strong> AI, ML, Web Development, Cybersecurity, and Robotics.</li>
                    <li className={styles.block}><strong>Mindset:</strong> Always eager to learn and explore new technologies.</li>
                </ul>

                <p><strong >Skills & Interests:</strong></p>
                <ul className={styles.list}>
                    <li className={styles.block}><strong>Tech Stack:</strong> Next.js, Python, Flask, TensorFlow, and Machine Learning.</li>
                    <li className={styles.block}><strong>Projects:</strong> AI-powered applications like image search, text classification, and real-time CCTV analytics.</li>
                    <li className={styles.block}><strong>Strengths:</strong> Strong problem-solving skills, game development, and metaverse technologies.</li>
                    <li className={styles.block}><strong>Passion:</strong> Love building unique and impactful projects that solve real-world problems.</li>
                </ul>

                <p><strong >Projects & Achievements:</strong></p>
                <ul className={styles.list}>
                    <li className={styles.block}>Created a jewelry recommendation system using AI.</li>
                    <li className={styles.block}>Developed a custom autocomplete AI model for generating complete stories.</li>
                    <li className={styles.block}>Built a Rock-Paper-Scissors AI game with real-time hand gesture detection.</li>
                    <li className={styles.block}>Designed an offline-first Next.js website using PWA features.</li>
                </ul>

                <p><strong >Goals & Aspirations:</strong></p>
                <ul className={styles.list}>
                    <li className={styles.block}>Aim to become a skilled AI developer and contribute to impactful innovations.</li>
                    <li className={styles.block}>Want to build free educational resources for students who lack access to learning.</li>
                    <li className={styles.block}>Dream of creating AI-powered solutions that improve safety, efficiency, and accessibility.</li>
                </ul>

                <p><strong >Personal Traits:</strong></p>
                <ul className={styles.list}>
                    <li className={styles.block}><strong>Work Ethic:</strong> Analytical, detail-oriented, and passionate about self-improvement.</li>
                    <li className={styles.block}><strong>Collaboration:</strong> Adaptable and focused, thriving in both independent and team environments.</li>
                    <li className={styles.block}><strong>Creativity:</strong> Enjoys problem-solving and exploring innovative solutions through technology.</li>
                    <li className={styles.block}><strong>Hobbies:</strong> Strategic thinking and immersive experiences like anime and gaming, which inspire creativity.</li>
                </ul>
            </div>
        </section>
    );
};

export default About;
