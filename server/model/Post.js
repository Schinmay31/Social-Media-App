import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId:{
        type : String,
        required : true
    },
    userName :{
        type : String,
        required : true
    },
    firstName:{
        type : String,
        required : false
    },
    lastName:{
        type : String,
        required : false
    },
    location: String,
    description : String,
    picturePath : String,
    userPicturePath :String,
    likes: {
        type: Map,
        of: Boolean,
        default: new Map(),
      },
    comment:{
        type:Array,
        default:[]
    }
},
{timestamps: true}
);

const Post = mongoose.model("Post",postSchema);

export default Post; 