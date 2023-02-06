import React from "react";
import styles from "./link.module.css";

interface HeaderProps {
    url: string;
    blank: boolean;
    callback: () => void;
    content: React.ReactNode;
}

export const Link = ({ url, blank, callback, content }: HeaderProps) => (
    <a
        href={url}
        className={styles.link}
        target={blank ? "_self" :"_self"}
        rel="noopener noreferrer"
        onClick={callback}
    >
        {content}
    </a>
);
