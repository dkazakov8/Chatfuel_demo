global.Promise = require('bluebird');

import config from 'config/config_main';
import createServer from 'server/createServer';
import serveStatic from 'middlewares/serveStatic';
import handleSession from 'middlewares/handleSession';
import parseJsonRequests from 'middlewares/parseJsonRequests';
import useGzipCompression from 'middlewares/useGzipCompression';
import handleFlashMessages from 'middlewares/handleFlashMessages';
import parseUrlencodedRequests from 'middlewares/parseUrlencodedRequests';
import loadModels from 'server/database/loadModels';
import getDataRoutes from 'server/routes/getDataRoutes';
import putDataRoutes from 'server/routes/putDataRoutes';
import isomorphRoutes from 'server/routes/isomorphRoutes';
import deleteDataRoutes from 'server/routes/deleteDataRoutes';
import connectToDatabase from 'server/database/connectToDatabase';

const server = createServer();

server
  .useMiddlewares(
    connectToDatabase,
    loadModels,
    useGzipCompression,
    serveStatic,
    parseJsonRequests,
    parseUrlencodedRequests,
    handleFlashMessages,
    handleSession
  )
  .useRoutes(isomorphRoutes, getDataRoutes, putDataRoutes, deleteDataRoutes)
  .start(config.serverPort, () => console.log(`Server started at ${config.siteUrl}`));

export default server;
