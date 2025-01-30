"use client"
import { useState, useEffect, useRef } from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
interface MenuItem {
    name: string,
    link: string
}
export default function Navbar() {
    const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
    const [dropDownItems, setDropDownItems] = useState<MenuItem[]>([]);
    const [navItems, setNavItems] = useState<MenuItem[]>([]);
    const navRef = useRef<HTMLDivElement | null>(null);

    const menuItems: MenuItem[] = [
        { name: "Home", link: "#home" },
        { name: "About Me", link: "#about" },
        { name: "Skills", link: "#skills" },
        { name: "Projects", link: "#projects" },
        { name: "Courses", link: "#courseComponent" },
        { name: "Education", link: "#education" },
        { name: "Artwork", link: "#artwork" },
        { name: "Contact", link: "#footer" },
    ];

    useEffect(() => {
        const updateWidth = () => {
            if (!navRef.current) return;
            const navWidth = navRef.current.offsetWidth;
            const itemWidths: number[] = [];
            const tempNavItems: MenuItem[] = [];
            const tempDropDownItems: MenuItem[] = [];

            const testItem = document.createElement("li");
            testItem.style.visibility = "hidden";
            testItem.style.position = "absolute";
            testItem.style.whiteSpace = "nowrap";

            menuItems.forEach((item) => {
                testItem.innerHTML = item.name;
                navRef.current?.appendChild(testItem);
                itemWidths.push(testItem.offsetWidth);
                navRef.current?.removeChild(testItem);
            });

            let usedWidth = 0;
            for (let i = 0; i < menuItems.length; i++) {
                if (usedWidth + itemWidths[i] <= navWidth - 100) {
                    tempNavItems.push(menuItems[i]);
                    usedWidth += itemWidths[i];
                } else {
                    tempDropDownItems.push(menuItems[i]);
                }
            }

            setNavItems(tempNavItems);
            setDropDownItems(tempDropDownItems);
        }

        updateWidth();

        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);


    return (
        <>
            <nav className={styles.navContainer} ref={navRef}>
                <ul className={styles.nav}>
                    {navItems.map((item, index) => (
                        <li key={index} className={styles.navItem}>
                            <Link href={item.link}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                {dropDownItems.length > 0 && (
                    <button className={styles.burgerButton}
                        onClick={() => setDisplayDropdown(!displayDropdown)}
                        onMouseEnter={() => setDisplayDropdown(true)}
                    >&#9776;</button>
                )}
            </nav>
            {dropDownItems.length > 0 && (
                <div className={styles.burgerMenu}
                    onMouseLeave={() => setDisplayDropdown(false)}
                >
                    {displayDropdown ? (
                        <ul className={styles.burgerDropdown}>
                            {dropDownItems.map((item, index) => (
                                <li key={index} className={styles.burgerItem}>
                                    <Link href={item.link}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            )}
        </>
    );
}
