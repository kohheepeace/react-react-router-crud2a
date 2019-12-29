// https://stackoverflow.com/questions/44133536/is-it-safe-to-store-a-jwt-in-localstorage-with-reactjs
import Cookies from 'js-cookie'

export const getAccessToken = () => Cookies.get('accessToken');
export const isAuthenticated = !!Cookies.get('accessToken');

export const logout = () => {
  Cookies.remove('accessToken');
}

export const setToken = (accessToken) => {
  Cookies.set('accessToken', accessToken);
}