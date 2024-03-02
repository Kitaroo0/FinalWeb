const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    age: Number,
    country: String,
    gender: { type: String, enum: ['male', 'female', 'other'] }
});

// Hash password before saving to database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;