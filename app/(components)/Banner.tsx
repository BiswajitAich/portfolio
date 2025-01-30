import styles from "@/app/styles/Banner.module.css"
interface type {
    total: number,
    title: string
}
const Banner = () => {
    const data: type[] = [
        { total: 2, title: "Projects" },
        { total: 10, title: "Skills" },
        { total: 50, title: "Courses" },
        { total: 3, title: "Languages" },
    ]

    return (
        <div className={styles.container} >
                <ul className={styles.list}>
                    {data.map((item, idx) => (
                        <li key={idx}>
                            <span className={styles.span1} />
                            <span className={styles.span2} />
                            <span className={styles.span3} />
                            <span className={styles.span4} />
                            <span className={styles.span5} />
                            <span className={styles.span6} />
                            <span className={styles.span7} />
                            <span className={styles.span8} />
                            <p>{item.total}+</p>
                            <p>{item.title}</p>
                        </li>
                    ))}
                </ul>
        </div>
    );
}

export default Banner;