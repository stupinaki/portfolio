import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { COOKIES_ACCEPTED, COOKIES_EXPIRE } from '@/constants/constants';

const useAcceptCookie = () => {
  const [isCookieAccepted, setIsCookieAccepted] = useState(false);

  useEffect(() => {
    setIsCookieAccepted(Cookies.get(COOKIES_ACCEPTED) === 'yes');
  }, []);

  const handleAcceptCookieClick = () => {
    Cookies.set(COOKIES_ACCEPTED, 'yes', { expires: COOKIES_EXPIRE });
    setIsCookieAccepted(true);
  };

  return {
    isCookieAccepted,
    handleAcceptCookieClick,
  };
};

export default useAcceptCookie;
