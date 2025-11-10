'use client';

import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import { useTranslation } from '@/app/i18n/client';
import useAcceptCookie from '@/hooks/useAcceptCookie';
import { DefaultComponentProps } from '@interfaces/base';

import styles from './cookie.module.scss';

const Cookie = ({ lng }: DefaultComponentProps) => {
  const { t } = useTranslation(lng, 'cookie');

  const { isCookieAccepted, handleAcceptCookieClick } = useAcceptCookie();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={clsx(styles.root, {
        [styles.visible]: !isCookieAccepted && isVisible,
      })}>
      <h3>{t('title')}</h3>

      <button className={styles.button} onClick={handleAcceptCookieClick}>
        {t('button')}
      </button>
    </div>
  );
};

export default Cookie;
