import express from 'express';
import config from 'config/config_main';

function serveStatic() {
  console.log('static served from', config.staticPath);

  return express.static(config.staticPath);
}

export default serveStatic;
