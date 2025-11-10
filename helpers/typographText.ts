import Typograf from 'typograf';

const tp = new Typograf({ locale: ['ru', 'en-US'] });
tp.enableRule('common/nbsp/afterShortWord');

export const typografText = (text: string): string => {
  return tp.execute(text);
};
