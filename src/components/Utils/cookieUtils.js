const daysToMilliseconds = (days) => days * 24 * 3600 * 1000;

export const getCookie = (key) => {
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(`${key}=`) === 0) {
      return cookie.substring(`${key}=`.length, cookie.length);
    }
  }
  return null;
};

export const setCookie = (key, value, days = 7) => {
  const key_value = `${key}=${value}`;
  const expiry_date = new Date();
  expiry_date.setTime(expiry_date.getTime() + daysToMilliseconds(days));
  const expires = `expires=${expiry_date.toUTCString()}`;
  document.cookie = [key_value, expires, 'path=/'].join('; ');
};

export const eraseCookie = (key) => {
  document.cookie = `${key}=; Max-Age=-99999999;`;
};
