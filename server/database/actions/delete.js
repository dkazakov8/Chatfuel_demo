import mongoose from 'mongoose';

let User;

function db_deleteUser(id) {
  if (User == null) User = mongoose.model('User');

  return User.findById(id)
    .remove()
    .exec();
}

function db_deleteAllUsers() {
  if (User == null) User = mongoose.model('User');

  return User.find({})
    .remove()
    .exec();
}

module.exports = {
  db_deleteUser,
  db_deleteAllUsers,
};
