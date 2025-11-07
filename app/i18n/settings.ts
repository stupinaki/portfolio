// пример: https://github.com/i18next/next-app-dir-i18next-example-ts/blob/main/app/i18n/settings.ts
import { languageList, fallbackLng } from '@/interfaces/dictionary';

import dictionaries from './locales/languages';

export const defaultNS = 'home';

export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    ns,
    lng,
    resources: dictionaries,
    defaultNS,
    fallbackLng,
    fallbackNS: defaultNS,
    supportedLngs: languageList,
  };
}
