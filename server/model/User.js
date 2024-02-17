import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    userName:{
         type:String,
         required:true,
         unique:true,
         min:3,
         max:10
    },
    firstName: {
        type: String,
        required: false,
        min: 3,
        max: 50
    },
    lastName: {
        type: String,
        required: false,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        require: true,
        min: 5,
    },
    picturePath: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: []
    },
    location: String,
    occupation: String,
    viewedProfiles: Number,
    impressions: Number
},
    { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'userName'        // Specifing  that the "email" field should be treated as the username
});

export const User = mongoose.model('user', userSchema);