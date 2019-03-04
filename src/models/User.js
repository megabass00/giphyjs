const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    role: { type: String, required: true, default: 'USER' },
    mastername: { type: String, required: true},
    email: { type: String},
    password: { type: String, required: true },
    avatar: { type: String, required: true, default: 'default.png' },
    created: { type: Date, default: Date.now }
}, {
    getters: true
});

UserSchema.virtual('urlAvatar').get(function() {
    return '/img/users/' + this.avatar;
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(`new hash:${hash}`.yellow);
    return hash;
};
UserSchema.methods.matchPassword = async function(password) {
    const match = await bcrypt.compare(password, this.password);
    // console.log(match);
    return match;
};

module.exports = mongoose.model('User', UserSchema); 