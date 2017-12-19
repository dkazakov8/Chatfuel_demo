import mongoose from 'mongoose';
import config from 'config/config_main';

mongoose.Promise = global.Promise;

function connectToDatabase() {
  mongoose.connect(config.mongoUrl, { useMongoClient: true }, function(err) {
    if (err) console.log(err);
  });
  const db = mongoose.connection;

  db.on('error', err => {
    console.log(`Mongoose default connection error: ${err}`);
  });

  db.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });

  process.on('SIGINT', () => {
    db.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      // eslint-disable-next-line no-process-exit
      process.exit(0);
    });
  });

  return (req, res, next) => next();
}

export default connectToDatabase;
