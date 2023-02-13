import styles from '../../styles/Home.module.scss'
import axios from "axios";
import {GetStaticProps} from "next";
import {TAlbum, TPhoto} from "../../types/containers";
import Image from "next/image";
import React, {useCallback} from "react";


export default function Photo({photo}: { photo: TPhoto[] }) {
    const getSizeIdx = useCallback((img: TPhoto) => (img.sizes.findIndex(size => size.type === "w")
        ),
        []
    )
    return (
        <>
            <main className={styles.portfolio__photo_page}>
                <div className={styles.portfolio__photo_container}>
                    {photo?.length && photo?.map((e: TPhoto, i: number) =>
                        <Image
                            src={e.sizes[getSizeIdx(e)].url}
                            alt="Picture of the author"
                            width={e.sizes[getSizeIdx(e)].width}
                            height={e.sizes[getSizeIdx(e)].height}
                            className={styles.portfolio__photo} key={i}
                        />
                    )}
                </div>
            </main>
        </>
    )
}


export async function getStaticPaths() {
    try {
        const res = axios.get(`https://api.vk.com/method/photos.getAlbums?owner_id=-${process.env.NEXT_PUBLIC_OWNER_ID}&access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&v=${process.env.NEXT_PUBLIC_VK_VERSION}`).then(res => res.data);
        const albums: TAlbum[] = await res.then(res => res.response?.items);
        const portfolioID = albums.find(e => e.title.includes("портфолио"))?.id;
        let photosId: string[] = [];
        const photoRes = axios.get(`https://api.vk.com/method/photos.get?owner_id=-${process.env.NEXT_PUBLIC_OWNER_ID}&access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&v=${process.env.NEXT_PUBLIC_VK_VERSION}&album_id=${portfolioID}`).then(res => res.data);
        const albumPhotos: TPhoto[] = await photoRes.then(res => res.response?.items);

        const albumPhotosId = albumPhotos?.map(e => e?.id)?.filter(e => e);

        albumPhotosId && photosId.push(...albumPhotosId);

        const paths = photosId?.map((id) => ({
            params: {id: id?.toString()},
        }))
        return {paths, fallback: false}
    } catch (err) {
        console.log(err)
        return {paths: [], fallback: false}
    }

}

export const getStaticProps: GetStaticProps<{ photo: TPhoto[] }> = async (
    context
) => {

    try {
        const res = axios.get(`https://api.vk.com/method/photos.getById?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&photos=-${process.env.NEXT_PUBLIC_OWNER_ID}_${context.params?.id}&v=${process.env.NEXT_PUBLIC_VK_VERSION}`).then(res => res.data);
        const photos: TPhoto[] = await res.then(res => res.response);
        const photo = JSON.parse(JSON.stringify(photos));
        return {props: {photo: photo}}
    } catch (err) {
        return {
            props: {
                photo: []
            }
        }
    }

}
