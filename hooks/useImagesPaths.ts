import { useMemo } from 'react';

import { useMediaQuery } from 'usehooks-ts';

import {
  SEQUENCES_DESKTOP,
  SEQUENCES_MOBILE,
} from '@/components/gsapScrollAnimation/path';

const useImagesPaths = () => {
  const moreThen1025 = useMediaQuery('(min-width: 1025px');

  const getPaths = (count: number, cdn: string) => {
    const arr = [];
    for (let i = 1; i <= count; i++) {
      arr.push(cdn + i.toString().padStart(3, '0') + '.webp');
    }
    return arr;
  };

  return useMemo(() => {
    if (moreThen1025) {
      return {
        ...SEQUENCES_DESKTOP,
        paths: getPaths(SEQUENCES_DESKTOP.frameCount, SEQUENCES_DESKTOP.cdn),
      };
    } else {
      return {
        ...SEQUENCES_MOBILE,
        paths: getPaths(SEQUENCES_MOBILE.frameCount, SEQUENCES_MOBILE.cdn),
      };
    }
  }, [moreThen1025]);
};

export default useImagesPaths;
