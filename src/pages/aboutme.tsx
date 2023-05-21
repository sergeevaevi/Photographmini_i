import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../components/Button/Button";
import { GetStaticProps } from "next";
import { TAlbum, TPhoto } from "../types/containers";
import axios from "axios";
import { PhotoCard } from "../components/PhotoCard/PhotoCard";
import classNames from "classnames";
import styles from "../styles/Home.module.scss";

const fiveMay2019 = 1494000000;

const aboutMe = [
  `Приятно познакомиться!\n Мне ${Math.abs(
    new Date(
      new Date().getTime() - new Date(1999, 4, 31).getTime()
    ).getUTCFullYear() - 1970
  )}, работаю веб-программистом и для меня фотография - это прекрасный способ отдохнуть и расслабиться`,
  `В целом занимаюсь фотографией около шести лет: это были съемки пейзажей, домашние семейные снимки, репортажная съемка и, наконец, портреты`,
  `Множество различных курсов помогли мне увидеть основные принципы построения хорошего кадра, но не огранчили фантазию - потому что иногда правила созданы для того чтобы их нарушать!`,
  `Снимаю на Canon EOS D-серии, при необходимости могу поснимать на телефон :)`,
  `Не стесняюсь обрабатывать фотографии в редакторах Photoshop, ретуширую лучшие кадры, но с легкостью отдаю исходники`,
  `Перед фотосессией была бы очень рада отобрать референсы, любимым инструментом здесь выступает Pinterest`,
  `Прогулочная фотосессия - мой любимый вариант съемки, но и студией меня не напугать)`,
  `Всегда открыта новым идеям и готова выслушать ваши предложения!`,
];
export default function About({ photos }: { photos: TPhoto[] }) {
  const getPhoto = useCallback(
    (images: TPhoto[], index: number) =>
      images?.[index] ? (
        <PhotoCard
          img={images[index]}
          classes={classNames(styles.main__image, {
            [styles.main__image_vertical]:
              images[index]?.sizes?.[0].width <
              images[index]?.sizes?.[0].height,
          })}
        />
      ) : null,
    []
  );

  const [aciveCard, setAciveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref?.current &&
      ref.current.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth",
      });
  }, [aciveCard]);
  return (
    <main className={styles.about}>
      <div className={styles.about__block}>
        {aboutMe.map((e, index) => (
          <div
            className={classNames(styles.about__card, {
              [styles.about__card_next]: aciveCard === index,
            })}
            key={index}
            ref={aciveCard === index ? ref : undefined}
            onClick={() => setAciveCard(index)}
            onAnimationEnd={() =>
              setAciveCard(index === aboutMe.length - 1 ? 0 : index + 1)
            }
          >
            <div className={styles.about__card_photo}>
              {getPhoto(photos, index)}
            </div>
            <p className={styles.about__card_text}>{e}</p>
          </div>
        ))}
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
