import _ from 'lodash';
import { ROUTES } from 'config/constants';
import axios from 'axios';
import { db_createNewUser, db_saveModel } from 'actions/create';
import { db_findUserById } from 'actions/get';

function putRandomUsers(req, res) {
  const { body: { totalUsers } } = req;

  if (!_.isNumber(totalUsers))
    return res.json({ success: false, message: 'Не передано количество пользователей' });

  return axios
    .get(`http://api.randomuser.me/?results=${totalUsers}`)
    .then(response => Promise.all(response.data.results.map(db_createNewUser).map(db_saveModel)))
    .then(() => res.json({ success: true }))
    .catch(error => res.json({ success: false, message: error.message }));
}

function putUserData(req, res) {
  const { body: { data } } = req;

  return db_findUserById(data._id)
    .then(user => {
      user.set(data);

      return user.save();
    })
    .then(() => res.json({ success: true }))
    .catch(error => res.json({ success: false, message: error.message }));
}

function putDataRoutes(app) {
  app.put(ROUTES.PUT_RANDOM_USERS, putRandomUsers);
  app.put(ROUTES.SAVE_USER, putUserData);
}

export default putDataRoutes;
