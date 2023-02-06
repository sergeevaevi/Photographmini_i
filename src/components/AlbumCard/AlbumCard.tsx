import React from "react";
import {TAlbum} from "../../types/containers";
import styles from './AlbumCard.module.scss'

interface Props {
    album: TAlbum;
    content?: React.ReactNode;
}

export const AlbumCard = ({album, content}: Props) => {

    return (
        <div className={styles.card}>
            {album.title}
        </div>
    )
};
