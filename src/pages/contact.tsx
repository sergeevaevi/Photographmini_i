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

type Inputs = {
    name: string,
    number: number,
    place: string;
}

const ContactCards = ({media}: { media: { icon: any, title: string, text?: string, link: string }[] }) => <>{media.map((e, i) =>
    <Link key={i} href={e.link} className={styles.contact__card}>
        <Image src={e.icon} alt={e.title}/>
        {e.text && <p>{e.text}</p>}
    </Link>)}</>;

export default function Contact() {
    const {register, handleSubmit, watch, control, formState: {errors}} = useForm<Inputs>({mode: 'onChange'});
    const router = useRouter()
    const onSubmit: SubmitHandler<Inputs> = async data => {
        // await sendContactForm(data);
        router.push(`contact/${data.name}/${data.number}/${data.place}`)
    };

    return (
        <>
            <main className={styles.contact}>
                <form className={styles.contact__form} onSubmit={handleSubmit(onSubmit)}>
                    <Input title="Имя" error={errors.name} validationMessage="Это поле обязательно!"
                           props={register("name", {required: true})}/>

                    <Input title="Номер телефона" type="tel"
                           error={errors.number} validationMessage="Это поле обязательно!"
                           props={register("number", {required: true})}/>
                    <Select title="Место съемки"
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
