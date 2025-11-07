import { LanguageVariants } from '@interfaces/dictionary';

const handleLanguageLink = (languageKey: LanguageVariants): string => {
  return languageKey === 'en' ? '/ru' : '/en';
};

export default handleLanguageLink;
