import React, {useEffect, useState} from "react";
import {TPhoto} from "../../types/containers";
import Image from "next/image";
import styles from './PhotoCard.module.scss'

interface Props {
    img: TPhoto;
    content?: React.ReactNode;
}

export const PhotoCard = ({img, content}: Props) => {
    const [idx, setIdx] = useState(0);
    useEffect(() => setIdx(img.sizes.findIndex(size => size.type === "w")
        ),
        [img]
    )
    return (
        <div className={styles.card}>
            <Image
                src={img.sizes[idx].url}
                alt="Picture of the author"
                width={img.sizes[idx].width}
                height={img.sizes[idx].height}
                className={styles.card__img}
            />
        </div>
    )
};
