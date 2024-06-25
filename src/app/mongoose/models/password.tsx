import mongoose, { Schema } from 'mongoose';

const Password = new Schema({
    currentPassword: {
        type: String,
        required: true
    },
 

});

const Userpassword = mongoose.models.Userpassword || mongoose.model('Userpassword', Password)

export default Userpassword;
