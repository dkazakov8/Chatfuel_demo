import _ from 'lodash';
import { ROUTES } from 'config/constants';
import { db_deleteAllUsers, db_deleteUser } from 'actions/delete';

function deleteUser(req, res) {
  const { body: { id } } = req;

  if (!_.isString(id)) return res.json({ success: false, message: 'Некорректый id' });

  return db_deleteUser(id)
    .then(() => res.json({ success: true }))
    .catch(error => res.json({ success: false, message: error.message }));
}

function deleteUsers(req, res) {
  return db_deleteAllUsers()
    .then(() => res.json({ success: true }))
    .catch(error => res.json({ success: false, message: error.message }));
}

function deleteDataRoutes(app) {
  app.delete(ROUTES.DELETE_USER, deleteUser);
  app.delete(ROUTES.DELETE_USERS, deleteUsers);
}

export default deleteDataRoutes;
