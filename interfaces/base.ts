import { LanguageVariants } from '@interfaces/dictionary';

export interface DefaultComponentProps {
  lng: LanguageVariants;
}

export type ParamsPage = Promise<{ lng: string }>;

export type HeaderNavKeys = 'github' | 'linkedin' | 'mail' | 'cv';

export type HeaderNav = {
  [key in HeaderNavKeys]: string;
};

export type HomePage = {
  nav: HeaderNav;
  introduction: string;
  goal: string;
  technologyStack: string;
};

export type CookiesProps = {
  title: string;
  button: string;
};

export type Theme = 'light' | 'dark';
