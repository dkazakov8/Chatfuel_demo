import axios from 'axios';
import _ from 'lodash';
import { errorTypes, createError } from 'utils/errors';

export function makeRequest(query) {
  return new Promise((resolve, reject) => {
    if (_.isObject(query) && _.isString(query.url) && _.isString(query.method)) {
      // console.time(`${query.method} ${query.url}`);

      return Promise.resolve()
        .then(
          () =>
            _.isObject(query.params)
              ? axios[query.method](query.url, query.params)
              : axios[query.method](query.url)
        )
        .then(response =>
          // console.timeEnd(`${query.method} ${query.url}`);
          resolve(response)
        )
        .catch(e => {
          // console.timeEnd(`${query.method} ${query.url}`);
          reject(e);
        });
    }

    return reject(
      createError(errorTypes.INCORRECT_OBJECT, 'makeRequest: некорректный query запроса')
    );
  });
}

export function getResponseData(response) {
  return new Promise((resolve, reject) => {
    if (_.isObject(response) && _.isObject(response.data)) {
      return resolve(response.data);
    }

    return reject(
      createError(errorTypes.INCORRECT_OBJECT, 'getResponseData: некорректный ответ сервера')
    );
  });
}

export function retryPromiseFunction(action, interval, limit) {
  return () =>
    new Promise((resolve, reject) =>
      (function retry(counter = 1) {
        return Promise.resolve(action())
          .then(resolve)
          .catch(error => {
            if (counter >= limit) {
              error.name = errorTypes.LIMIT;

              return reject(error);
            }

            // eslint-disable-next-line no-param-reassign
            return setTimeout(retry.bind(null, ++counter), interval);
          });
      })()
    );
}
