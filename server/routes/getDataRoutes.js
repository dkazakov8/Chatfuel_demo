import { ROUTES } from 'config/constants';
import { db_findUsers } from 'actions/get';

function getUsers(req, res) {
  const { body: { page } } = req;

  return db_findUsers(page)
    .then(data => res.json({ success: true, data }))
    .catch(error => res.json({ success: false, message: error.message }));
}

function getDataRoutes(app) {
  app.post(ROUTES.GET_USERS, getUsers);
}

export default getDataRoutes;
