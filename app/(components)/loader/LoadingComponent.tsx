import styles from "@/app/styles/loader/LoadingComponent.module.css";

const LoadingComponent: React.FC<{ height: number }> = ({ height }) => {
    return <div style={{ minHeight: `${height}px` }} className={styles.loader} />;
};

export default LoadingComponent;
