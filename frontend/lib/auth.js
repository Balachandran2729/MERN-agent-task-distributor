// Client-side auth utilities
export const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    console.log('Setting token:', token); // Debug log
    localStorage.setItem('token', token);
  }
};

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    console.log('Getting token:', token); // Debug log
    return token;
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    console.log('Removing token'); // Debug log
    localStorage.removeItem('token');
  }
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  const isAuthenticated = !!token;
  console.log('Is authenticated:', isAuthenticated); // Debug log
  return isAuthenticated;
};