import mongoose from 'mongoose';

let User;

function db_findUserById(id) {
  return mongoose
    .model('User')
    .findById(id)
    .exec();
}

function db_findUsers(pageReq) {
  if (User == null) User = mongoose.model('User');

  return new Promise((resolve, reject) => {
    User.count().exec(function(err2, total) {
      if (err2) return reject(err2);

      const limit = 3;

      if (total === 0) return resolve({ limit, users: null, total, page: 0, totalPages: 0 });

      const totalPages = Math.ceil(total / limit);
      const page = pageReq > totalPages - 1 ? totalPages - 1 : pageReq;
      const skip = limit * page;

      return User.find()
        .limit(limit)
        .skip(skip)
        .sort({
          registered_at: 'asc',
        })
        .exec((err, users) => {
          if (err) return reject(err);

          return resolve({ limit, users, total, page, totalPages });
        });
    });
  });
}

module.exports = {
  db_findUserById,
  db_findUsers,
};
