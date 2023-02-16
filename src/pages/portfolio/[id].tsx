import styles from '../../styles/Home.module.scss'
import axios from "axios";
import {GetStaticProps} from "next";
import {TAlbum, TPhoto} from "../../types/containers";
import Image from "next/image";
import React, {useCallback} from "react";
import Next from "../../assets/next.svg"
import Link from "next/link";
import classNames from "classnames";

export default function Photo({
                                  photo,
                                  nextPhotoID
                              }: { photo: TPhoto[], nextPhotoID: { next: number, prev: number } }) {
    const getSizeIdx = useCallback((img: TPhoto) => (img.sizes.findIndex(size => size.type === "w")
        ),
        []
    )
    return (
        <>
            <main className={styles.portfolio__photo_page}>
                <div className={styles.portfolio__photo_container}>
                    {photo?.length && photo?.map((e: TPhoto, i: number) =>
                        <React.Fragment key={i}>
                            <Link href={`/portfolio/${nextPhotoID?.prev}`}>
                                <Image src={Next} alt="Prev"
                                       className={classNames(styles.portfolio__next_left, {[styles.portfolio__next_disabled]: !nextPhotoID?.prev})}/>
                            </Link>
                            <Image
                                src={e.sizes[getSizeIdx(e)].url}
                                alt="Picture of the author"
                                width={e.sizes[getSizeIdx(e)].width}
                                height={e.sizes[getSizeIdx(e)].height}
                                className={styles.portfolio__photo} key={i}
                            />
                            <Link href={`/portfolio/${nextPhotoID?.next}`}>
                                <Image src={Next} alt="Next"
                                       className={classNames(styles.portfolio__next_right, {[styles.portfolio__next_disabled]: !nextPhotoID?.next})}/>
                            </Link>
                        </React.Fragment>
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
        const photoRes = axios.get(`https://api.vk.com/method/photos.get?owner_id=-${process.env.NEXT_PUBLIC_OWNER_ID}&access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&v=${process.env.NEXT_PUBLIC_VK_VERSION}&album_id=${portfolioID}`).then(res => res.data);
        const albumPhotos: TPhoto[] = await photoRes.then(res => res.response?.items);

        const photosId = albumPhotos?.map(e => e?.id)?.filter(e => e);
        
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

        const albumID = photos?.[0]?.album_id;

        const allPhotosRes = axios.get(`https://api.vk.com/method/photos.get?owner_id=-${process.env.NEXT_PUBLIC_OWNER_ID}&access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&v=${process.env.NEXT_PUBLIC_VK_VERSION}&album_id=${albumID}`).then(res => res.data);
        const allPhotos: TPhoto[] = await allPhotosRes.then(res => res.response?.items);

        const current = allPhotos.findIndex(e => e.id.toString() === context?.params?.id?.toString());
        console.log(allPhotos?.[current - 1]?.id, allPhotos?.[current + 1]?.id)


        return {
            props: {
                photo: photo,
                nextPhotoID: {next: allPhotos?.[current - 1]?.id ?? null, prev: allPhotos?.[current + 1]?.id ?? null}
            }
        }
    } catch (err) {
        return {
            props: {
                photo: [],
                nextPhotoID: {next: null, prev: null}
            }
        }
    }

}
