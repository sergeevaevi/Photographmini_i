import styles from '../styles/Home.module.scss'
import {GetStaticProps} from "next";
import axios from "axios";
import {TAlbum, TPhoto} from "../types/containers";
import {PhotoCard} from "../components/PhotoCard/PhotoCard";
import Link from "next/link";

export default function Portfolio({photos}: { photos: TPhoto[] }) {
    return (
        <>
            <main className={styles.portfolio}>
                {photos && (photos).map((e: TPhoto, i: number) => (
                    <Link href={`/portfolio/${e.id}`} key={i}>
                        <PhotoCard img={e} key={i}/></Link>))
                }
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps<{ photos: TPhoto[] }> = async (context) => {
    try {
        const albumsRes = axios.get(`https://api.vk.com/method/photos.getAlbums?owner_id=-${process.env.NEXT_PUBLIC_OWNER_ID}&access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&v=${process.env.NEXT_PUBLIC_VK_VERSION}`).then(res => res.data);
        const albums: TAlbum[] = await albumsRes.then(res => res.response.items);
        const portfolioID = albums.find(e => e.title.includes("портфолио"))?.id;
        const portfolioRes = axios.get(`https://api.vk.com/method/photos.get?owner_id=-${process.env.NEXT_PUBLIC_OWNER_ID}&access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&v=${process.env.NEXT_PUBLIC_VK_VERSION}&album_id=${portfolioID}`).then(res => res.data);
        const photos: TPhoto[] = await portfolioRes.then(res => res.response.items);
        return {
            props: {
                photos,
            },
        }
    } catch (err) {
        return {
            props: {
                photos: []
            }
        }
    }


}
