import styles from '../styles/Home.module.scss'
import Link from "next/link";
import React from "react";
import {Button} from "../components/Button/Button";


export default function About() {
    return (

        <main className={styles.about}>
            <h1 className={styles.main__title}>Немного обо мне</h1>
            <p className={styles.main__subtitle}>Мне {new Date().getFullYear() - new Date(1999, 4, 31).getUTCFullYear()},
                работаю веб-программистом. Фотография для меня дополнительный источник заработка, но в первую очередь
                способ отдохнуть и расслабиться</p>
            <p className={styles.main__subtitle}>В целом занимаюсь фотографией около шести лет: это были съемки
                пейзажей,
                домашние семейные снимки, репортажная съемка и, наконец, портреты.</p>
            <p className={styles.main__subtitle}>Верю что фотографа делает не оборудование, а прямые руки. Не стесняюсь
                обрабатывать фотографии в редакторах, но с легкостью отдаю исходники.</p>
            <p className={styles.main__subtitle}>Перед фотосессией была бы очень рада отобрать референсы, любимым
                инструментом здесь выступает Pinterest.</p>
            <p className={styles.main__subtitle}>Всегда открыта новым идеям и готова выслушать ваши идеи!</p>
            <div className={styles.button__wrapper}>
                <Link href="/albums" className={styles.card}>
                    <Button label="Все фото" classes={styles.button__portfolio}/>
                </Link>


            </div>
        </main>

    )
}
