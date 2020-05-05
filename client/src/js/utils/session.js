import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';

const HS256_HEADER = 'eyJhbGciOiJIUzI1NiJ9';

export function getSession() {
  return jwtDecode([HS256_HEADER, cookie.load('session'), cookie.load('session.sig')].join('.'));
}

export function inGame() {
  try {
    return Boolean(getSession().urlid);
  } catch (err) {
    return false;
  }
}

export function getUrlid() {
  try {
    return getSession().urlid;
  } catch (error) {
    return null;
  } 
}

export function getUuid() {
  try {
    return getSession().uuid;
  } catch (error) {
    return null;
  } 
}

export function endSession() {
  cookie.remove('session');
  cookie.remove('session.sig');

}