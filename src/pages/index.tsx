import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import React from "react";
import { Button } from "../components/Button/Button";
import Image from "next/image";
import Me from "../assets/mei.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Мини-Фотограф</title>
        <meta name="description" content="Фотограф Ростов-на-Дону" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.main__background_block}>
          <h1 className={styles.main__title}>
            Привет!
            <br /> Меня зовут Лена
            <br /> И я фотограф в Ростове-на-Дону
          </h1>
          {/* <p className={styles.main__subtitle}>
            И мне нравится фотографировать. Хочешь посмотреть?
          </p> */}
          <div className={styles.button__wrapper}>
            <Link href="/portfolio" className={styles.card}>
              <Button label="Портфолио" classes={styles.button__portfolio} />
            </Link>
            <Link href="/contact" className={styles.card}>
              <Button label="Контакты" classes={styles.button__contact} />
            </Link>
          </div>
          <Link href="/aboutme" className={styles.button__about_wrapper}>
            <Button label="Обо мне" classes={styles.button__about} />
          </Link>
        </div>
        <div className={styles.main__background_image}>
          <Image src={Me} fill alt="me" placeholder="blur" quality={100} />
        </div>
      </main>
    </>
  );
}
