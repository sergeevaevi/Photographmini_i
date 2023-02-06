import React from 'react';
import classNames from "classnames";
import styles from './Button.module.scss'

interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;

    classes?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
                           primary = false,
                           size = 'medium',
                           backgroundColor,
                           classes,
                           label,
                           ...props
                       }: ButtonProps) => {
    return (
        <button
            type="button"
            className={classNames(classes, styles.button, styles[`button__${size}`], styles[`button__${primary ? "primary" : "secondary"}`])}
            style={{backgroundColor}}
            {...props}
        >
            {label}
        </button>
    );
};
