import React, {useEffect, useState} from "react";
import {TPhoto} from "../../types/containers";
import Image from "next/image";
import styles from './PhotoCard.module.scss'
import classNames from "classnames";

const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`


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
                placeholder='blur' quality={100}
                blurDataURL={rgbDataURL(50, 50, 50)}
            />
        </div>
    )
};
