import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken : {
        type: String
    },
    resetPasswordCode : {
        type: String
    },
    resetPasswordAttempt: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);
export default User;