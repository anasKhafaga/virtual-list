import "@/styles/index.scss"
import type { AppProps } from "next/app";
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd';
import {appWithTranslation} from "next-i18next"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import enUS from 'antd/locale/en_US';
import arEG from 'antd/locale/ar_EG';
import { localeMapValue } from '@/types/global';
import { Cairo, Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { AppContextProvider } from "@/contexts/app";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-english",
});

const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-arabic",
  display: "swap",
});

  
  const localeMap = new Map<string, localeMapValue>([
    ['en', {locale: enUS, dir: 'ltr', fontFamily: "var(--font-english)" }],
    ['ar', {locale: arEG, dir: 'rtl', fontFamily: "var(--font-arabic)" }]
  ])
  
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })


function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const fontFamily = localeMap.get(locale ?? "en")?.fontFamily;
  const dir = localeMap.get(locale ?? "en")?.dir;
  const antLocale = localeMap.get(locale ?? "en")?.locale;

  useEffect(() => {
    document.body.classList.add(locale=== "ar" ? cairo.variable : poppins.variable)
  })
  
  return (
      <ConfigProvider theme={{ token: { fontFamily } }} locale={antLocale} direction={dir}>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <div>
              <Component {...pageProps} />
            </div>
          </AppContextProvider>
        </QueryClientProvider>
      </ConfigProvider>
  )
}


export default appWithTranslation(App);