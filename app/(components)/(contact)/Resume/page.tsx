"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import isMobile from "@/app/js/isMobile";
import resume_image from "@/public/static/ResumeScreenshot.png";

interface WindowDimensions {
    width: number;
    height: number;
}
export default function ResumeViewer() {
    const [isMobileView, setIsMobileView] = useState(true);
    const [dimensions, setDimensions] = useState<WindowDimensions>({
        width: 300,
        height: 424.60
    });

    const ASPECT_RATIO = 313 / 443;

    useEffect(() => {
        setIsMobileView(isMobile());
    }, []);

    useEffect(() => {
        const calculateDimensions = () => {
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            let calculatedWidth: number;
            let calculatedHeight: number;

            if (windowWidth / windowHeight > ASPECT_RATIO) {
                calculatedHeight = windowHeight * 0.9;
                calculatedWidth = windowHeight * ASPECT_RATIO;
            } else {
                calculatedWidth = windowWidth * 0.95;
                calculatedHeight = windowWidth / ASPECT_RATIO;
            }

            setDimensions({
                width: calculatedWidth,
                height: calculatedHeight
            });
        };

        calculateDimensions();
        window.addEventListener('resize', calculateDimensions);

        return () => window.removeEventListener('resize', calculateDimensions);
    }, []);

    const styles = {
        btn: {
            width: "90%",
            height: "2rem",
            background: "black",
            borderRadius: "1rem",
            border: "1px solid white",
            color: "gold",
            left: "50%",
            bottom: "0",
            transform: "translateX(-50%)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
        },
        container: {
            width: "100%",
            height: "100%",
            overflow: "hidden"
        },
        img: {
            left: "50%",
            top: "0",
            transform: "translateX(-50%)",
        }
    }

    const MobileView = () => (
        <div style={styles.container}>
            <Image
                src={resume_image}
                height={dimensions.height}
                width={dimensions.width}
                alt="Resume preview"
                priority
                style={{position: "absolute", ...styles.img, objectFit: "contain", }}
                title="Resume in Image Format. Download it in PDF format."
            />
            <Link
                href="/files/Biswajit_Aich_Resume.pdf"
                download="Biswajit_Aich_Resume"
                target="_blank"
                rel="noopener noreferrer"
                style={{position: "fixed",...styles.btn}}
                onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#007BFF")
                }
            >
                Download resume
            </Link>
        </div>
    );

    const DesktopView = () => (
        <div
            style={styles.container}
        >
            <iframe
                style={{ ...styles.container, border: "0" }}
                src="/files/Biswajit_Aich_Resume.pdf"
                title="Biswajit Aich resume viewer"
            />

        </div>
    );

    return isMobileView ? <MobileView /> : <DesktopView />;
}