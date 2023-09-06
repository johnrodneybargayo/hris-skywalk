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
  