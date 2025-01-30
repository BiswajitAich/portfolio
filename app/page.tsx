"use client";

import Link from "next/link";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import bot_img from "@/public/static/bot.gif";
import Image from "next/image";
import SketchGallery from "./(components)/(profile)/SketchGallery";
import LoadingComponent from "./(components)/loader/LoadingComponent";
const Navbar = dynamic(() => import("./(components)/Navbar"), { ssr: false, loading: () => <LoadingComponent height={50}/> });
const ProfilePic = dynamic(() => import("./(components)/(profile)/ProfilePic"), { ssr: false, loading: () => <LoadingComponent height={700}/> });
const About = dynamic(() => import("./(components)/About"), { ssr: false, loading: () => <LoadingComponent height={960}/> });
const Banner = dynamic(() => import("./(components)/Banner"), { ssr: false, loading: () => <LoadingComponent height={220}/> });
const InfiniteSkills = dynamic(() => import("./(components)/InfiniteSkills"), { ssr: false, loading: () => <LoadingComponent height={230}/> });
const Projects = dynamic(() => import("./(components)/Projects"), { ssr: false, loading: () => <LoadingComponent height={490}/> });
const Education = dynamic(() => import("./(components)/Education"), { ssr: false, loading: () => <LoadingComponent height={800}/> });
const Footer = dynamic(() => import("./(components)/Footer"), { ssr: false, loading: () => <LoadingComponent height={900}/> });
const Background = dynamic(() => import("./(components)/animarion/Background"), { ssr: false });
const Skills = dynamic(() => import("./(components)/Skills"), { ssr: false, loading: () => <LoadingComponent height={450}/> });
const CoursesComponent = dynamic(() => import("./(components)/Courses/Courses"), { ssr: false, loading: () => <LoadingComponent height={400}/> });

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Background />
        <ProfilePic />
        <InfiniteSkills />
        <About />
        <Banner />
        <Skills />
        <Projects />
        <CoursesComponent />
        <Education />
        <SketchGallery />
      </main>
      <Footer />
      <Link href={"/Bot"} style={{ position: "fixed", right: "10px", bottom: "10px" }}>
        <Image src={bot_img} width={50} height={50} alt="BOT" title="Chat With Bot" />
      </Link>
    </div>
  );
}
