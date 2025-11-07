import { fallbackLng, languageList, LanguageVariants } from '@interfaces/dictionary';

export function getLanguage(lng: string): LanguageVariants {
  return languageList.find((v) => v === lng) || fallbackLng;
}
