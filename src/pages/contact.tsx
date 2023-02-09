import styles from '../styles/Home.module.scss'
import Image from "next/image";
import VK from "../assets/vk.svg"
import TG from "../assets/tg.svg"
import WA from "../assets/wa.svg"
import IM from "../assets/im.svg"
import Link from "next/link";
import {Input} from "../components/Input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {Select} from "../components/Select/Select";
import {useRouter} from "next/router";
import {TextArea} from "../components/TextArea/TextArea";

type Inputs = {
    name: string,
    number: number,
    place: string;
    message: string;
}

const mapPlaceToMail: { [key: string]: string } = {
    street: "Улица",
    cafe: 'Кафе',
    other: "Было бы здорово уточнить детали, потому что все ",
    studio: "Студия",
}

const ContactCards = ({media}: { media: { icon: any, title: string, text?: string, link: string }[] }) =>
    <div className={styles.contact__cards}>{media.map((e, i) =>
        <Link key={i} href={e.link} className={styles.contact__card}>
            <Image src={e.icon} alt={e.title}/>
            {e.text && <p>{e.text}</p>}
        </Link>)}</div>;

export default function Contact() {
    const {register, handleSubmit, watch, control, formState: {errors}} = useForm<Inputs>({mode: 'onChange'});
    const router = useRouter()
    const onSubmit: SubmitHandler<Inputs> = data => {
        router.push(encodeURI(`mailto:photographmini_i@yahoo.com?subject=Фотосессия&body=Добрый день!\nМеня зовут ${data.name}.\n${data.place ? `${mapPlaceToMail[data.place]} звучит как интересное место для фотосессии.\n` : ""}Хотелось бы уточнить детали и записаться.\nСо мной можно связаться по номеру: ${data.number}\n\n`))
    };

    return (
        <>
            <main className={styles.contact}>
                <form className={styles.contact__form} onSubmit={handleSubmit(onSubmit)}>
                    <Input classes={styles.contact_name} title="Имя" error={errors.name}
                           validationMessage="Это поле обязательно!"
                           props={register("name", {required: true})}/>

                    <Input classes={styles.contact_tel} title="Номер телефона" type="tel"
                           error={errors.number} validationMessage="Это поле обязательно!"
                           props={register("number", {required: true})}/>
                    <Select classes={styles.contact_place} title="Место съемки"
                            control={control}
                            options={[{label: "", value: ""}, {label: "Студия", value: "studio"}, {
                                label: "Улица",
                                value: "street"
                            }, {
                                label: 'Кафе',
                                value: "cafe"
                            }, {
                                label: "Другое место",
                                value: "other"
                            }]} props={register("place")}/>
                    <TextArea classes={styles.contact_message} title="Сообщение" props={register("message")}/>
                    <Input type="submit"/>
                </form>

                <ContactCards media={[{icon: TG, title: "Telegram", text: "Telegram", link: "https://t.me/LllenS"}, {
                    icon: WA,
                    title: "WhatsApp",
                    text: "WhatsApp",
                    link: "https://wa.me/79147959926"
                },
                    {
                        icon: IM,
                        title: "Instagram",
                        text: "Instagram",
                        link: "https://www.instagram.com/photographmini_i"
                    }, {
                        icon: VK,
                        title: "VK",
                        text: "VK", link: "https://vk.com/lllens"
                    }]}/>


            </main>
        </>
    )
}
