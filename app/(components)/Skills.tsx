"use client";
import styles from "@/app/styles/Skills.module.css"
import Image from "next/image";
interface ProfessionalSkillsTypes {
    name: string,
    value: number
}
interface CodingSkillsTypes extends ProfessionalSkillsTypes {
    img: string
}

// codingSkills-----------------------------------------------
const CodingSkills: React.FC = () => {
    const codingSkills: CodingSkillsTypes[] = [
        {
            name: "HTML",
            img: "https://img.icons8.com/?size=100&id=20909&format=png&color=000000",
            value: 90
        },
        {
            name: "CSS",
            img: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Official_CSS_Logo.svg",
            value: 90
        },
        {
            name: "Javascript",
            img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            value: 95
        },
        {
            name: "Typescript",
            img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
            value: 90
        },
        {
            name: "Python",
            img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
            value: 90
        },
        {
            name: "Java",
            img: "https://img.icons8.com/?size=100&id=GPfHz0SM85FX&format=png&color=000000",
            value: 50
        },
        {
            name: "C++",
            img: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
            value: 80
        },
        {
            name: "Tensorflow",
            img: "https://img.icons8.com/?size=100&id=n3QRpDA7KZ7P&format=png&color=000000",
            value: 80
        },
        {
            name: "Pytorch",
            img: "https://img.icons8.com/?size=100&id=jH4BpkMnRrU5&format=png&color=000000",
            value: 75
        },
        {
            name: "NextJs",
            img: "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000",
            value: 92
        },
    ]

    return (
        <div className={styles.container} id="skills">
            <h2>Coding skills</h2>
            <div className={styles.insideContainer}>
                {codingSkills.map((item, idx) => (
                    <div key={idx} className={styles.card}>
                        <p>{item.name}</p>
                        <div className={styles.img_div}>
                            <Image src={item.img} height={50} width={50} alt={item.name} loading="lazy" />
                        </div>
                        <div className={styles.progress_container}>
                            <div
                                className={styles.progressFill}
                                style={{ minWidth: `${item.value}%` }}
                            />
                            <span className={styles.value}>{item.value}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
// professionalSkills------------------------------------------------

const ProfessionalSkills: React.FC = () => {
    const professionalSkills: ProfessionalSkillsTypes[] = [
        {
            name: "Creativity",
            value: 95
        },
        {
            name: "Communication",
            value: 80
        },
        {
            name: "Problem Solving",
            value: 90
        },
        {
            name: "Team Work",
            value: 85
        }
    ]

    return (
        <div className={styles.container}>
            <h2>Professional skills</h2>
            <div className={styles.insideContainer}>
                {professionalSkills.map((item, idx) => (
                    <div key={idx} className={styles.card_circle}>
                        <div className={styles.progress_container_circle}>
                            <div
                                className={styles.progressFill_circle}
                                style={{
                                    background: `conic-gradient(var(--cyan-d) ${item.value * 3.6}deg, var(--theme) ${item.value * 3.6}deg)`
                                }}
                            />
                            <span>{item.value}%</span>
                        </div>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Skills: React.FC = () => {
    return (
        <>
            <CodingSkills />
            <ProfessionalSkills />
        </>
    );
}

export default Skills;