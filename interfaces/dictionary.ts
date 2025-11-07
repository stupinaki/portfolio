export const languages = ['ru', 'en'];
export const languageList = ['ru', 'en'] as const;
export type LanguageVariants = (typeof languageList)[number];

export const fallbackLng: LanguageVariants = 'en';

export function getLanguage(lng: string): LanguageVariants {
  return languageList.find((v) => v === lng) || fallbackLng;
}
