import styles from "@/app/styles/Courses/Card.module.css"
import Image from "next/image";
import Link from "next/link";
interface Type {
    link: string,
    courseName: string,
    certificateBy: string,
    img: string,
}
const Card: React.FC<Type> = ({ link, courseName, certificateBy, img }) => {
    return (
        <div className={styles.card}>
            <Link href={link} target="_blank" rel="noopener noreferrer">
                <p>{certificateBy}</p>
                <div className={styles.div1} />
                <div className={styles.div2} />
                <div className={styles.div3} />
                <div className={styles.div4} />
                <div className={styles.div5}>{courseName}</div>
                <Image src={img} alt={""} height={50} width={50}/>
            </Link>
        </div>
    );
}

export default Card;