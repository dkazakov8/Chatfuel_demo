import session from 'express-session';
import config from 'config/config_main';

/**
 * Since 1.5.0 no need to use cookie-parser
 * This module now directly reads and writes cookies on req/res.
 * Using cookie-parser may result in issues if the secret
 * is not the same between this module and cookie-parser.
 *
 */

function handleSession() {
  const sessionConfig = { ...config.sessionConfig };

  if (sessionConfig.useRedis) {
    const RedisStore = require('connect-redis')(session);

    sessionConfig.store = new RedisStore(config.redisConfig);
  }

  return session(sessionConfig);
}

export default handleSession;
