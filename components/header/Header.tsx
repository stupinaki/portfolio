'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import clsx from 'clsx';

import { useTranslation } from '@/app/i18n/client';
import { useTheme } from '@/contexts/ThemeContext';
import handleLanguageLink from '@/helpers/handleLanguageLink';
import { HEADER_LINKS } from '@components/header/data';
import { DefaultComponentProps } from '@interfaces/base';
import DarkSvg from 'assets/svg/dark.svg';
import LightSvg from 'assets/svg/light.svg';

import styles from './header.module.scss';

export const Header = ({ lng }: DefaultComponentProps) => {
  const [isActive, setActive] = useState(false);
  const { t } = useTranslation(lng);
  const { isDark, setDark } = useTheme();

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
            <button
              className={clsx(styles.link, styles.theme)}
              onClick={() => setDark(!isDark)}>
              <div className={styles.linkText}>
                {isDark ? (
                  <DarkSvg width={20} height={20} />
                ) : (
                  <LightSvg width={20} height={20} />
                )}
              </div>
            </button>
          </li>

          <li>
            <Link href={handleLanguageLink(lng)} className={styles.link}>
              <p className={styles.linkText}>{lng === 'ru' ? 'En' : 'Ru'}</p>
            </Link>
          </li>

          {HEADER_LINKS.map(({ key, linkEn, link }) => (
            <li key={key}>
              <Link
                href={lng === 'en' && linkEn ? linkEn : link}
                target="_blank"
                className={styles.link}>
                <p className={styles.linkText}>{t(`nav.${key}`)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
