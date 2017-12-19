import fs from 'fs';
import path from 'path';

import convertLessToObject from '../utils/convertLessToObject';

import ln from './localization';

const isTest = process.env.NODE_ENV === 'test';

const port = 1234;

// eslint-disable-next-line no-sync
const themeLess = fs.readFileSync(path.resolve(__dirname, '../client/styles/theme.less'), 'utf8');
const themeObject = convertLessToObject(themeLess);

const config = {
  siteUrl: `http://localhost:${port}`,
  serverPort: port,
  staticPath: path.resolve(__dirname, '../dist'),
  sessionConfig: {
    secret: '***********',
    resave: true, // Renew expire on res.send
    rolling: true, // Renew expire on res.send
    saveUninitialized: false, // Save some storage space
    name: 'sid', // Should differ from localhost to localhost
    cookie: {
      path: '/', // Root path of domain
      httpOnly: true, // JS won't see session in document.cookie
      maxAge: isTest ? 1300 : 30000000, // From res.send
      secure: false, // If have https set to true
    },
  },
  mongoUrl: 'mongodb://localhost/chatfuel',
  theme: themeObject,
  ln: ln.EN, // Default
  lang: 'EN', // Default
};

export default config;
