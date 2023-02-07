import handler from "../api/contact";
import {GetStaticPaths, GetStaticProps} from "next";

export default function ContactSlug({data}: { data: string[] }) {

    return (
        <>
            <div>{data?.[0]}</div>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<{ data: string[] }> = async (
    context
) => {
    const [name, number, place] = context.params?.slug as string[];
    console.log(number, place)
    const res = await handler({method: "GET", query: {name, number, place}})

    return {
        // redirect: {
        //     destination: '/',
        //     permanent: false,
        // },
        props: {
            data: ["nothing"]
        }
    }


}