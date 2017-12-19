import mongoose from 'mongoose';

function createUserSchema(validators) {
  const userSchema = mongoose.Schema({
    role: String,
    gender: String,
    last_name: String,
    first_name: String,
    picture: {
      large: String,
      medium: String,
      thumbnail: String,
    },
    phone: String,
    email: String,
    birth_date: Date,
    registered_at: { type: Date, default: Date.now },
    is_active: Boolean,
    is_removed: Boolean,
  });

  return mongoose.model('User', userSchema);
}

export default createUserSchema;
