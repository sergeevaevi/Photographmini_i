import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html lang="en" prefix="og: https://ogp.me/ns#">
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta property="og:title" content="Photographmimi"/>
                <meta property="og:description"
                      content="Фотограф Ростов-на-Дону"/>
                <meta property="og:locale" content="ru_RU"/>
                <meta property="og:site_name" content="Photographmini"/>
                <meta property="og:url" content="https://sergeevaevi.github.io/photographmini_i/"/>
                <meta property="og:image" content="https://sergeevaevi.github.io/photographmini_i/photo.jpg"/>
                <meta property="og:type" content="website"/>
                <meta name="google-site-verification" content="QOn5RjPCfIcWI3co1JCgpO5Gk_LVm8uNv64tVdOg6Eo"/>
                <meta name="p:domain_verify" content="6dc03ec26092aea6a6e9ad31ea65eb0c"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
