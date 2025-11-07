export const languages = ['ru', 'en'];
export const languageList = ['ru', 'en'] as const;
export type LanguageVariants = (typeof languageList)[number];
export const fallbackLng: LanguageVariants = 'en';
