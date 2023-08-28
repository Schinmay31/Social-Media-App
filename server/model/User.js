// import timespan from "jsonwebtoken/lib/timespan";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required:true,
        min:3,
        max:50
    },
    lastName :{
        type : String,
        required:true,
        min:3,
        max:50
    },
    email :{
        type : String,
        required:true,
        unique:true,
        max:50
    },
    password :{
        type : String,
        require:true,
        min:5,
    },
    picturePath :{
        type : String,
        default:""
    },
    friends:{
        type : Array,
        default : []
    },
    location : String,
     occupation : String,
     viewedProfiles : Number,
     impressions : Number
},
{timespan:true}
);

const User = mongoose.model("User", userSchema);
export default User;