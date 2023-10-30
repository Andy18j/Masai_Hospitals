const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  Email: String,
   Password: String,
  Confirm_Password: String,
});

const UserModel = mongoose.model('User', userSchema);

module.exports= {
    UserModel
}