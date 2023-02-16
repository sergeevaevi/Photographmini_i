import Head from 'next/head'
import {Inter} from '@next/font/google'
import styles from '../styles/Home.module.scss'
import Link from "next/link";
import React from "react";
import {Button} from "../components/Button/Button";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <>
            <Head>
                <title>Мини-Фотограф</title>
                <meta name="description" content="Фотограф Ростов-на-Дону"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.main__title}>Привет!<br/> Меня зовут Лена</h1>
                <p className={styles.main__subtitle}>И мне нравится фотографировать. Хочешь посмотреть?</p>
                <div className={styles.button__wrapper}>
                    <Link href="/portfolio" className={styles.card}>
                        <Button label="Портфолио" classes={styles.button__portfolio}/>
                    </Link>


                    <Link href="/contact" className={styles.card}>
                        <Button label="Контакты" classes={styles.button__contact}/>
                    </Link>
                    <Link href="/aboutme" className={styles.card}>
                        <Button label="Обо мне" classes={styles.button__about}/>
                    </Link>

                </div>
            </main>
        </>
    )
}
