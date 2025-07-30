"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "@/app/styles/Projects.module.css";
import Link from "next/link";
import lilastoreImg from "@/public/static/lilastore.png";
import rockPaperScissorsImg from "@/public/static/rock-paper-scissor.png";
import projectUrl from "@/public/static/project-url.png";
import imageColorization from "@/public/static/image-colorization.png";
import resumeAnalyzer from "@/public/static/resume-analyzer.png";

interface Project {
  id: string;
  type: string;
  img: StaticImageData;
  field: string[];
  description?: string;
  githubLink?: string;
  liveLink?: string;
}

const projectsData: Project[] = [
  {
    id: "lila-store",
    type: "E-commerce Website",
    img: lilastoreImg,
    field: ["Next.js", "TypeScript", "E-commerce"],
    description: "A full-featured e-commerce platform with responsive design",
    githubLink: "https://github.com/BiswajitAich/lilastore",
    liveLink: "https://lilastore.vercel.app/",
  },
  {
    id: "rock-paper-scissors",
    type: "AI Game Website",
    img: rockPaperScissorsImg,
    field: ["Next.js", "AI", "Game Development", "Yolov11"],
    description: "Interactive rock-paper-scissors game with AI opponent",
    githubLink: "https://github.com/BiswajitAich/rock-paper-scissor-game",
    liveLink: "https://rock-paper-scissor-game-by-yolo.vercel.app/",
  },
  {
    id: "project-url",
    type: "Full-stack",
    img: projectUrl,
    field: ["Next.js", "NodeJs", "Tailwind", "Docker"],
    description: "Url shortener and Analysis",
    githubLink: "https://github.com/BiswajitAich/url-trimmer",
    liveLink: "https://nytherra.vercel.app/",
  },
  {
    id: "image-colorization",
    type: "Deep learning",
    img: imageColorization,
    field: ["Tensorflow", "google colab"],
    description: "Image colorization using Generative Adversarial Networks",
    githubLink: "https://github.com/BiswajitAich/image-colorization",
  },
  {
    id: "resume-analyzer",
    type: "RAG",
    img: resumeAnalyzer,
    field: ["Next.js", "lang-graph", "Groq"],
    description: "AI-driven simple Resume Analyzer using lang-graph",
    githubLink: "https://github.com/BiswajitAich/resume-analyzer",
    liveLink: "https://resume-analyzer-mocha-nine.vercel.app/",
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [flip, setFlip] = useState<boolean>(false);

  return (
    <button
      onClick={() => setFlip(!flip)}
      className={`${styles.card} ${flip ? styles.rotate : ""}`}
    >
      <div className={`${styles.card_side} ${styles.front}`}>
        <div className={styles.card_header}>
          <h3>{project.type}</h3>
        </div>
        <div className={styles.img_card}>
          <Image
            src={project.img}
            alt={`${project.type} project screenshot`}
            height={100}
            width={100}
            className={styles.project_image}
          />
        </div>
      </div>
      <div className={`${styles.card_side} ${styles.back}`}>
        <div className={styles.technologies}>
          {project.field.map((tech, index) => (
            <span key={index} className={styles.tech_badge}>
              {tech}
            </span>
          ))}
        </div>
        {project.description && (
          <p className={styles.project_description}>{project.description}</p>
        )}
        <div className={styles.project_links}>
          {project.githubLink && (
            <Link
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <Image
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg"
                }
                height={50}
                width={50}
                alt="Github"
                title="Visit to the Github link"
              />
            </Link>
          )}
          {project.liveLink && (
            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              title="Link to the live website"
            >
              Live
            </Link>
          )}
        </div>
      </div>
    </button>
  );
};

const Projects: React.FC = () => {
  return (
    <section className={styles.projects_section} id="projects">
      <h2 className={styles.section_title}>My Projects</h2>
      <div className={styles.cards}>
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
