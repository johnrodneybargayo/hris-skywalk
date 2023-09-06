// authUtils.ts

// Function to set authentication cookie
export const setAuthCookie = (token: string) => {
  document.cookie = `accessToken=${token}; path=/; max-age=3600`; // Set cookie with a 1-hour expiration (adjust as needed)
};

// Function to check if the user is authenticated
export const isAuthenticated = (): boolean => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  return !!token;
};

// Function to clear authentication cookie
export const clearAuthCookie = () => {
  document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
};

const daysToMilliseconds = (days: number): number => days * 24 * 3600 * 1000;

export const getCookie = (key: string): string | null => {
  const cookies: string[] = document.cookie.split(';');

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

export const setCookie = (key: string, value: string, days: number = 7): void => {
  const keyValue: string = `${key}=${value}`;
  const expiryDate: Date = new Date();
  expiryDate.setTime(expiryDate.getTime() + daysToMilliseconds(days));
  const expires: string = `expires=${expiryDate.toUTCString()}`;
  document.cookie = [keyValue, expires, 'path=/'].join('; ');
};

export const eraseCookie = (key: string): void => {
  document.cookie = `${key}=; Max-Age=-99999999;`;
};
