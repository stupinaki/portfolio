'use client';

import { useTranslation } from '@/app/i18n/client';
import { typografText } from '@helpers/typographText';
import { DefaultComponentProps } from '@interfaces/base';

import styles from './description.module.scss';

export const Description = ({ lng }: DefaultComponentProps) => {
  const { t } = useTranslation(lng);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{typografText(t('introduction'))}</h1>

      <div className={styles.textWrapper}>
        <div>{typografText(t('goal'))}</div>

        <div className={styles.goal}>{typografText(t('technologyStack'))}</div>
      </div>
    </div>
  );
};
