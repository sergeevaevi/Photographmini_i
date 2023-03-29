import styles from "../styles/Home.module.scss";
import Link from "next/link";
import React, { useCallback } from "react";
import { Button } from "../components/Button/Button";
import { GetStaticProps } from "next";
import { TAlbum, TPhoto } from "../types/containers";
import axios from "axios";
import { PhotoCard } from "../components/PhotoCard/PhotoCard";

const fiveMay2019 = 1494000000;

export default function About({ photos }: { photos: TPhoto[] }) {
  const getPhoto = useCallback(
    (images: TPhoto[], index: number) =>
      images?.[index] ? (
        <PhotoCard img={images[index]} classes={styles.main__image} />
      ) : null,
    []
  );
  return (
    <main className={styles.about}>
      <h1 className={styles.main__title}>обо мне</h1>
      <div className={styles.main__block}>
        <p className={styles.main__subtitle}>
          Мне{" "}
          {new Date().getFullYear() - new Date(1999, 4, 31).getUTCFullYear()},
          работаю веб-программистом. Фотография для меня дополнительный источник
          заработка, но в первую очередь способ отдохнуть и расслабиться
          <div className={styles.main__block}>
            <p className={styles.main__subtitle}>
              В целом занимаюсь фотографией около шести лет: это были съемки
              пейзажей, домашние семейные снимки, репортажная съемка и, наконец,
              портреты
            </p>
            {getPhoto(photos, 1)}
          </div>
        </p>
        {getPhoto(photos, 0)}
      </div>

      <div className={styles.main__block}>
        <p className={styles.main__subtitle}>
          Верю что фотографа делает не оборудование, а прямые руки. Не стесняюсь
          обрабатывать фотографии в редакторах, но с легкостью отдаю исходники<div className={styles.main__block}>
        <p className={styles.main__subtitle}>
          Перед фотосессией была бы очень рада отобрать референсы, любимым
          инструментом здесь выступает Pinterest{" "}
         </p> {getPhoto(photos, 4)}
        
      </div>
        </p>
        {getPhoto(photos, 2)}
      </div>
      
         <div className={styles.main__block}>
           {getPhoto(photos, 5)}
            <p className={styles.main__subtitle}>
              Всегда открыта новым идеям и готова выслушать ваши предложения!
           {getPhoto(photos, 3)}
            </p>
          </div>

      <div className={styles.button__wrapper}>
        <Link href="/albums" className={styles.card}>
          <Button label="Все фото" classes={styles.button__portfolio} />
        </Link>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps<{ photos: TPhoto[] }> = async (
  context
) => {
  try {
    const albumsRes = axios
      .get(
        `https://api.vk.com/method/photos.getAlbums?owner_id=${process.env.NEXT_PUBLIC_MY_ID}&access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&need_system=1&v=${process.env.NEXT_PUBLIC_VK_VERSION}`
      )
      .then((res) => res.data);
    const albums: TAlbum[] = await albumsRes.then((res) => res.response.items);
    const myPagePhotosID = albums.find((e) =>
      e.title.includes("profile photos")
    )?.id;
    const myPagePhotosRes = axios
      .get(
        `https://api.vk.com/method/photos.get?owner_id=${process.env.NEXT_PUBLIC_MY_ID}&access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&extended=1&v=${process.env.NEXT_PUBLIC_VK_VERSION}&album_id=${myPagePhotosID}`
      )
      .then((res) => res.data);
    const photos: TPhoto[] = await myPagePhotosRes.then(
      (res) => res.response.items
    );
    return {
      props: {
        photos: photos
          ?.filter((e) => (e?.date ?? fiveMay2019) >= fiveMay2019)
          ?.sort((a, b) => (b?.likes?.count ?? 0) - (a?.likes?.count ?? 0)),
      },
      revalidate: 10,
    };
  } catch (err) {
    return {
      props: {
        photos: [],
      },
    };
  }
};
