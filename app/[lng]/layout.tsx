import { ReactNode } from 'react';

import type { Metadata } from 'next';

import { Geist } from 'next/font/google';

import '@styles/reset.scss';
import '@styles/variables.scss';
import clsx from 'clsx';

import Cookie from '@components/cookie/Cookie';
import { Header } from '@components/header/Header';
import { getLanguage } from '@helpers/getLanguage';
import styles from '@styles/rootLayout.module.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

type Params = Promise<{ lng: string }>;

type Props = {
  children: ReactNode;
  params: Params;
};

export async function generateMetadata(params: Params): Promise<Metadata> {
  const { lng } = await params;
  const language = getLanguage(lng);
  const isRu = language === 'ru';

  return {
    title: isRu ? 'Ступина: портфолио' : 'Stupina: portfolio',
    description: isRu
      ? 'Сайт-визитка, где представлены мои проекты и даны контакты для связи'
      : 'A business card website presenting my projects and providing contact information',
    icons: [{ rel: 'icon', url: '/favicon.png' }],
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lng } = await params;

  const language = getLanguage(lng);

  return (
    <html lang={language}>
      <body className={clsx(geistSans.variable, styles.root)}>
        <Header lng={language} />
        {children}
        <Cookie lng={language} />
      </body>
    </html>
  );
}
