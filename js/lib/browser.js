
import { createHistory } from 'history';
import cookie from 'react-cookie';


export const history = createHistory();

export function getData() {
  return {token: cookie.load('token'), pathname: document.location.pathname};
}

export function setData({token, pathname}) {
  if (token && cookie.load('token') != token) {
    cookie.save('token', token, {path: '/', expires: new Date(Date.now() + 1000 * 3600 * 24 * 7)});
  } else if (!token) {
    cookie.remove('token');
  }

  if (pathname && pathname != location.pathname) {
    history.pushState(null, pathname);
  }
}