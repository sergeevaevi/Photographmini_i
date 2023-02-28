import Image from "next/image";
import React from "react";
import {TAlbum} from "../../types/containers";
import styles from './AlbumCard.module.scss'

interface Props {
    album: TAlbum;
    content?: React.ReactNode;
}

export const getTimeTimestamp = (date: number) => {
    return new Date(date * 1000).toLocaleString('en-us', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/(\d+)\/(\d+)\/(\d+)/, '$2.$1.$3')
}

export const AlbumCard = ({album, content}: Props) => {

    return (
        <div className={styles.card}>
            <h6 className={styles.card__title}>{album.title}</h6>
            {album?.description && <p className={styles.card__description}>{album.description}</p>}
            <div className={styles.card__bottom}>
                {(album?.created || album?.updated) && <div className={styles.card__dates}>
                    {album.created &&
                    <p className={styles.card__dates_created}>{getTimeTimestamp(album.created)}</p>}
                    {album.updated &&
                    <p className={styles.card__dates_updated}>{getTimeTimestamp(album.updated)}</p>}
                </div>}
                {album?.size && <p className={styles.card__size}>{album.size}</p>}
            </div>
            {album.thumb_src && <Image src={album.thumb_src} fill className={styles.card__image} alt="cover"/>}


        </div>
    )
};
