export const errorTypes = {
  LIMIT: 'LIMIT',
  NOTIFICATION: 'NOTIFICATION',
  INCORRECT_OBJECT: 'INCORRECT_OBJECT',
  INCORRECT_TYPE: 'INCORRECT_TYPE',
  INCORRECT_VALUE: 'INCORRECT_VALUE',
  SILENT: 'SILENT',
};

export function createError(name, message) {
  const newError = new Error(message);

  newError.name = name;

  return newError;
}

export function logError(error) {
  console.error(error);

  return Promise.resolve();
}
