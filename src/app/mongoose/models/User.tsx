import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User;
