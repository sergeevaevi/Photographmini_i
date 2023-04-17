import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from "react-query";
import {Layout} from "../components/Layout/Layout";
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import "nprogress/nprogress.css";

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
    const router = useRouter();
    NProgress.configure({showSpinner:false})
    useEffect(() => {
        const handleRouteStart = () => NProgress.start();
        const handleRouteDone = () => NProgress.done();
     
        router.events.on("routeChangeStart", handleRouteStart);
        router.events.on("routeChangeComplete", handleRouteDone);
        router.events.on("routeChangeError", handleRouteDone);
     
        return () => {
          // Make sure to remove the event handler on unmount!
          router.events.off("routeChangeStart", handleRouteStart);
          router.events.off("routeChangeComplete", handleRouteDone);
          router.events.off("routeChangeError", handleRouteDone);
        };
      }, []);
    return <QueryClientProvider client={queryClient}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </QueryClientProvider>
}
