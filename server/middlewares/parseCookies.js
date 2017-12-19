import cookieParser from 'cookie-parser';

function parseCookies(secret) {
  return cookieParser(secret);
}

export default parseCookies;
