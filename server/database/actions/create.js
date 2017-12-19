import mongoose from 'mongoose';

let User;

function db_saveModel(model) {
  return model.save();
}

function db_createNewUser({ gender, name = {}, picture, phone, registered, dob, email }) {
  if (User == null) User = mongoose.model('User');

  const newUser = new User();

  newUser.role = 'USER';
  newUser.gender = gender || '';
  newUser.last_name = name.last || '';
  newUser.first_name = name.first || '';
  newUser.picture = picture || {};
  newUser.phone = phone || '';
  newUser.email = email || '';
  newUser.birth_date = new Date(dob);
  newUser.registered_at = new Date(registered) || Date.now();
  newUser.is_active = true;
  newUser.is_removed = false;

  return newUser;
}

module.exports = {
  db_saveModel,
  db_createNewUser,
};
