import React from "react";
import styles from './TextArea.module.scss'
import classNames from "classnames";

interface Props {
    title?: string;
    placeholder?: string;
    props?: any;
    classes?: string
}

export const TextArea = ({title, placeholder, props, classes}: Props) => {
    return (
        <div className={classNames(classes, styles.textarea__wrapper)}>
            {title && <label className={styles.textarea__label}>{title}</label>}
            <textarea className={styles.textarea} placeholder={placeholder}{...props}/>
        </div>
    )
};
