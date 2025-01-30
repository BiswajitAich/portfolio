import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (options: IntersectionObserverInit) => {
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
    const [hasIntersected, setHasIntersected] = useState<boolean>(false);
    const intersectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry], obs) => {
            if (entry.isIntersecting && !hasIntersected) {
                setIsIntersecting(true);
                setHasIntersected(true);
                obs.unobserve(entry.target); 
            }
        }, options);

        if (intersectionRef.current) observer.observe(intersectionRef.current);

        return () => observer.disconnect();
    }, [options, hasIntersected]);

    return [intersectionRef, isIntersecting] as const;
};

export default useIntersectionObserver;
