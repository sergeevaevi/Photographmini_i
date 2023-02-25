import React, {useEffect, useState} from "react";
import {TPhoto} from "../../types/containers";
import Image from "next/image";
import styles from './PhotoCard.module.scss'
import classNames from "classnames";

interface Props {
    img: TPhoto;
    onClick?: () => void;
    content?: React.ReactNode;
    sizeType?: "w" | "x" | "m";
    classes?: string;
}

export const PhotoCard = ({img, onClick, content, sizeType = "w", classes}: Props) => {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
            const i = img.sizes.findIndex(size => size.type === sizeType);
            setIdx(i !== -1 ? i : 0);
        }
        ,
        [img]
    )
    return (
        <div className={classNames(styles.card, classes)}>
            <Image
                src={img.sizes[idx].url}
                alt="Picture of the author"
                width={img.sizes[idx].width}
                height={img.sizes[idx].height}
                className={styles.card__img}
                onClick={onClick}
            />
        </div>
    )
};
