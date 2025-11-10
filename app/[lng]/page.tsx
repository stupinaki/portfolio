import { Description } from '@components/description/Description';
import { getLanguage } from '@helpers/getLanguage';
import { ParamsPage } from '@interfaces/base';
import styles from '@styles/page.module.scss';

// todo: для карточек https://reactbits.dev/components/chroma-grid
// todo: карточки проектов

type Props = {
  params: ParamsPage;
};

export default async function Home({ params }: Props) {
  const { lng } = await params;

  const language = getLanguage(lng);

  return (
    <div className={styles.page}>
      <Description lng={language} />
    </div>
  );
}
