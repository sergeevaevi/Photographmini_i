import React from "react";
import styles from "./Layout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import classNames from "classnames";
import { Button } from "../../components/Button/Button";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const Layout = ({ children }: Props) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Мини-Фотограф</title>
        <meta name="description" content="Фотограф Ростов-на-Дону" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div
          className={classNames(styles.grid, {
            [styles.grid__landing]: router.asPath === "/",
          })}
        >
          <Link href="/" className={styles.card}>
            <Button
              label="Главная"
              classes={classNames(styles.button, {
                [styles.button__active]: router.asPath === "/",
              })}
            />
          </Link>
          <Link href="/portfolio" className={styles.card}>
            <Button
              label="Портфолио"
              classes={classNames(styles.button, {
                [styles.button__active]: router.asPath === "/portfolio",
              })}
            />
          </Link>

          <Link href="/contact" className={styles.card}>
            <Button
              label="Контакты"
              classes={classNames(styles.button, {
                [styles.button__active]: router.asPath === "/contact",
              })}
            />
          </Link>
        </div>
        {children}
      </div>
    </>
  );
};
