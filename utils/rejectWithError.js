function rejectWithError(name, message) {
  const newError = new Error(message);

  newError.name = name;

  return Promise.reject(newError);
}

module.exports = rejectWithError;
