import express from 'express';

function createServer() {
  const server = {};

  server.app = express();
  server.useMiddlewares = function useMiddlewares(...middlewares) {
    middlewares.forEach(fn => server.app.use(fn()));

    return server;
  };
  server.useRoutes = function useRoutes(...routes) {
    routes.forEach(route => route(server.app));

    return server;
  };
  server.start = function startServer(port, callback) {
    server.app.listen(port, callback);

    return server;
  };

  return server;
}

export default createServer;
