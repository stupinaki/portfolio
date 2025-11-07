import { HeaderNavKeys } from '@interfaces/base';

type HeaderItem = {
  key: HeaderNavKeys;
  link: string;
  linkEn?: string;
};

export const HEADER_LINKS: HeaderItem[] = [
  {
    key: 'github',
    link: 'https://github.com/stupinaki',
  },
  {
    key: 'linkedin',
    link: 'https://www.linkedin.com/in/kseniia-stupina-31465423a/',
  },
  {
    key: 'mail',
    link: 'mailto:k.i.stupina9@gmail.com',
  },
  {
    key: 'cv',
    link: '/cv-stupina-ru.pdf',
    linkEn: '/cv-stupina-en.pdf',
  },
];
