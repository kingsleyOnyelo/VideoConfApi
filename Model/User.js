const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    organisation : {
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    username:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true,
        select: false
    }
});

const UserModel = mongoose.model('host', UserSchema);

module.exports = UserModel;