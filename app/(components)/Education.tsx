import styles from '@/app/styles/Education.module.css';

interface Education {
    institution: string,
    img: string,
    name: string,
    degree: string,
    duration: string
}

const educationData: Education[] = [
    {
        institution: "MAKAUT University",
        img: "https://upload.wikimedia.org/wikipedia/en/3/37/Maulana_Abul_Kalam_Azad_University_of_Technology_Logo.svg",
        name: "Academy of Technology",
        degree: "Bachelor of Technology in Computer Science",
        duration: "2022 - 2026",
    },
    {
        institution: "WBBHSE",
        img: "https://upload.wikimedia.org/wikipedia/en/b/b7/West_Bengal_Council_of_Higher_Secondary_Education_Logo.png",
        name: "Vivekananda English Academy",
        degree: "Higher Secondary Education (Science)",
        duration: "2020 - 2022",
    },
    {
        institution: "WBBSE",
        img: "https://upload.wikimedia.org/wikipedia/en/d/d9/West_Bengal_Board_of_Secondary_Education_Logo.png",
        name: "Vivekananda English Academy",
        degree: "Secondary Education",
        duration: "2018 - 2020",
    },
];


const Education: React.FC = () => {
    return (
        <section className={styles.container} id='education'>
            <h2 className={styles.heading}>Education</h2>

            <ul className={styles.timeline}>
                {educationData.map((item, index) => (
                    <li key={index} className={styles.card} style={{backgroundImage: `url('${item.img}')`}}>
                        <h3 className={styles.institution}>{item.institution}</h3>
                        <p className={styles.degree}>{item.name}</p>
                        <p className={styles.degree}>{item.degree}</p>
                        <span className={styles.duration}>{item.duration}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Education;
