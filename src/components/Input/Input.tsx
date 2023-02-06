import React from "react";
import styles from './Input.module.scss'
import classNames from "classnames";
import {FieldError} from "react-hook-form";

interface Props {
    title?: string;
    placeholder?: string;
    props?: any;
    type?: string;
    validator?: string;
    error?: FieldError;
    validationMessage?: string;
}

export const Input = ({title, placeholder, type, validator, error, validationMessage, props}: Props) => {

    return (
        <div className={classNames(styles.input__wrapper, {[styles.input__wrapper_submit]: type === "submit"})}>
            {title && <label className={styles.input__label}>{title}</label>}
            <input className={styles.input} placeholder={placeholder} type={type} {...props} />
            {error && <span className={styles.input__message}>{validationMessage ?? "Field is invalid"}</span>}
        </div>
    )
};
