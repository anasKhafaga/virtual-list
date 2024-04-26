import Head from "next/head";
import { Layout } from "antd";
import React from "react";
import { useTranslation } from "next-i18next";
import Header from "@/components/layout/Header";
import Content from "@/components/layout/Content";
import IndexContent from "@/components/IndexContent";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from "next";


export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="This application displays thousands of tickets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout style={{ height: "100vh" }}>
        <Header />
        <Content>
          <IndexContent />
        </Content>
      </Layout>
    </>
  );
}


export const getStaticProps: GetStaticProps = async ({
  locale,
}) => {
  const i18nProps = await serverSideTranslations(locale ?? 'en', [
    "common"
  ]);

 return { 
  props: {
      ...i18nProps
    }
  }
}