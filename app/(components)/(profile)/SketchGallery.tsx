import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/styles/profile/SketchGallery.module.css";

const sketches = [
  {
    id: 1,
    title: "Warrior's Gaze",
    description: "A fierce warrior with a captivating gaze, blending bold colors and tribal elements to create an intense presence.",
    imageUrl: "/static/insta1.webp",
  },
  {
    id: 2,
    title: "Blue Serenity",
    description: "A modern portrait with striking blue hair and bold red lips, capturing a sense of calm confidence.",
    imageUrl: "/static/insta2.webp",
  },
  {
    id: 3,
    title: "Avatar Essence",
    description: "A pencil sketch inspired by the world of Avatar, bringing out the beauty of Na’vi features with intricate details.",
    imageUrl: "/static/insta3.webp",
  },
  {
    id: 4,
    title: "Lady in Red",
    description: "An elegant woman in a vibrant red dress, set against a cozy café background, exuding charm and mystery.",
    imageUrl: "/static/insta4.webp",
  },
  {
    id: 5,
    title: "Melodic Emotions",
    description: "A soulful black-and-white sketch of a woman lost in the music of her violin, portraying deep emotion.",
    imageUrl: "/static/insta5.webp",
  },
  {
    id: 6,
    title: "Soft Allure",
    description: "A delicate and dreamy pencil sketch of a woman with mesmerizing eyes and flowing hair, evoking a gentle allure.",
    imageUrl: "/static/insta6.webp",
  },
];

const SketchGallery: React.FC = () => {
  return (
    <div className={styles.container} id="artwork">
      <h2 className={styles.title}>My Artwork Collection</h2>
      <div className={styles.grid}>
        {sketches.map((sketch) => (
          <div key={sketch.id} className={styles.card}>
            <Image src={sketch.imageUrl} alt={sketch.title} width={300} height={200} className={styles.image} />
            <h3 className={styles.cardTitle}>{sketch.title}</h3>
            <p className={styles.description}>{sketch.description}</p>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <Link href="https://www.instagram.com/aich.007" target="_blank" rel="noopener noreferrer" className={styles.button}>
          See More on Instagram
        </Link>
      </div>
    </div>
  );
};

export default SketchGallery;
