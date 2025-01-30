import Card from "./Card";
export interface CourseTypes {
    link: string,
    courseName: string,
    certificateBy: string,
    img: string
}
const Courses: React.FC = () => {
    const courseData: CourseTypes[] = [
        {
            link: "https://coursera.org/share/c6fef3dc2e66430e3a43247c3efc31fc",
            courseName: "Natural Language Processing",
            certificateBy: "DeepLearning.AI",
            img: "/static/deeplearning_Icon.png"
        },
        {
            link: "https://coursera.org/share/dd302eaba23cb04ccc46bdf107430e66",
            courseName: "Improving Deep Neural Networks: Hyper parameter tuning...",
            certificateBy: "DeepLearning.AI",
            img: "/static/deeplearning_Icon.png"
        },
        {
            link: "https://coursera.org/share/f10d5436b973abcbd404c4c1bcc545dc",
            courseName: "Fine-tuning Language Models for Business Tasks",
            certificateBy: "Coursera Instructor Network",
            img: "/static/coursera.png"
        },
        {
            link: "/Courses",
            courseName: "View All Certificates...",
            certificateBy: "",
            img: "https://img.icons8.com/?size=100&id=47817&format=png&color=228BE6"
        },
    ]
    const styles = {
        container: {
            display: "flex",
            justifyContent: "space-evenly",
            overflow: "auto",
            padding: "0 1rem"
        },
        heading: {
            marginLeft: "2rem",
            fontSize: "2.5rem",
            color: "var(--black)",
            fontWeight: "700",
            letterSpacing: "2px",
            borderBottom: "2px solid var(--box)",
            display: "inline-block",
            paddingBottom: "0.5rem",
        }
    }
    return (
        <>
            <h2 id="courseComponent"style={{ ...styles.heading, textTransform: "uppercase", textAlign: "center" }}>Cources</h2>
            <div style={styles.container}>
                {courseData.map((item, index) => (
                    <Card
                        key={index}
                        {...item}
                    />
                ))}
            </div>
        </>
    );
}

export default Courses;