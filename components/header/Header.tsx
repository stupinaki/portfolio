'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import clsx from 'clsx';

import { useTranslation } from '@/app/i18n/client';
import handleLanguageLink from '@/helpers/handleLanguageLink';
import { HEADER_LINKS } from '@components/header/data';
import { DefaultComponentProps } from '@interfaces/base';

import styles from './header.module.scss';

export const Header = ({ lng }: DefaultComponentProps) => {
  const [isActive, setActive] = useState(false);
  const { t } = useTranslation(lng);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(styles.root, {
        [styles.active]: isActive,
      })}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link
              href={handleLanguageLink(lng)}
              className={clsx(styles.link, styles.bold)}>
              {lng === 'ru' ? 'EN' : 'RU'}
            </Link>
          </li>
          {HEADER_LINKS.map(({ key, linkEn, link }) => (
            <li key={key}>
              <Link
                href={lng === 'en' && linkEn ? linkEn : link}
                target="_blank"
                className={styles.link}>
                {t(`nav.${key}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
