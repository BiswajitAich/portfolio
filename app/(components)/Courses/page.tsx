import Card from "./Card";
import { CourseTypes } from "./Courses";
import styles from "@/app/styles/Courses/CoursesPage.module.css"
interface AllCourseTypes extends CourseTypes {
    details: {
        skills: string[],
        date: string,
        time: string,
        grade?: string
    }
}
export default () => {
    const courseData: AllCourseTypes[] = [
        {
            link: "https://coursera.org/share/c6fef3dc2e66430e3a43247c3efc31fc",
            courseName: "Natural Language Processing",
            certificateBy: "DeepLearning.AI",
            img: "/static/deeplearning_Icon.png",
            details: {
                skills: ["Machine Translation", "Transformers", "Sentiment Analysis", "Word2vec", "Attention Models"],
                date: "September 30, 2024",
                time: "Approximately 3 months at 10 hours a week to complete",
                grade: ""
            }
        },
        {
            link: "https://coursera.org/share/dd302eaba23cb04ccc46bdf107430e66",
            courseName: "Improving Deep Neural Networks: Hyper parameter tuning...",
            certificateBy: "DeepLearning.AI",
            img: "/static/deeplearning_Icon.png",
            details: {
                skills: ["Tensorflow", "Deep Learning", "hyperparameter tuning", "Mathematical Optimization"],
                date: "October 31, 2024",
                time: "23 hours (approximately)",
                grade: "Grade Achieved: 95.29%"
            }
        },
        {
            link: "https://coursera.org/share/f10d5436b973abcbd404c4c1bcc545dc",
            courseName: "Fine-tuning Language Models for Business Tasks",
            certificateBy: "Coursera Instructor Network",
            img: "/static/coursera.png",
            details: {
                skills: ["Business Analysis", "Forward-Thinking and Planning", "Fine-Tuning Strategies", "Application of AI in Business", "Large Language Model"],
                date: "September 2, 2024",
                time: "3 hours (approximately)",
                grade: "Grade Achieved: 93.33%"
            }
        }
    ]

    return (
        <div className={styles.container}>
            <h1>CERTIFICATES</h1>
            {courseData.map((item, id) => (
                <div key={id} className={styles.innerContainer}>
                    <Card  {...item} />
                    <div className={styles.details}>
                        <h3 className={styles.certificateBy}>{item.certificateBy}</h3>
                        <p className={styles.courseName}>{item.courseName}</p>
                        <h4 className={styles.h_skills}>SKILLS GAIN</h4>
                        <div className={styles.skills}>
                            {item.details.skills.map((i, idx) => (
                                <p key={idx}>{i}</p>
                            ))}
                        </div>
                        <p className={styles.completedBy}>Completed by Biswajit Aich</p>
                        <p className={styles.date}>{item.details.date}</p>
                        <p className={styles.time}>{item.details.time}</p>
                        <p className={styles.grade}>{item.details.grade}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
