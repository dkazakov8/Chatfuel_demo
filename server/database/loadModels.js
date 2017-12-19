import config from 'config/config_main';
import models from 'models';
import validators from 'utils/validators';

function loadModels() {
  const validatorsLocalized = validators(config.ln);

  for (const modelName in models) {
    models[modelName](validatorsLocalized);
  }

  return (req, res, next) => next();
}

export default loadModels;
