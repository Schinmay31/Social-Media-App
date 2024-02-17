import Post from "../model/Post.js";
import { User } from "../model/User.js";

// create                      when user creates new post.
export const createPost = async function(req,res){
    try{

        const {userId, description , picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            userName : user.userName,
            firstName : user.firstName,
            lastName : user.lastName,
            location : user.location,
            description,
            userPicturePath : user.picturePath,
            picturePath,
            likes : {},
            comment :[]
        });
        await newPost.save();

        const post = await Post.find();

        return res.status(201).json(post);

    }
    catch(err){
        return res.status(409).json({message:err.message});
    }
}


// read 
export const getFeedPosts = async function(req,res){
    try{
        const post = await Post.find();
        return res.status(201).json(post);
    }catch(err){
        return res.status(404).json({message:err.message});
    }
}

export const getUserPosts = async function(req,res){
    try{
          const {userId} = req.params;
          const post = await Post.find({userId});
          return res.status(200).json(post);
    }catch(err){
        return res.status(404).json({message:err.message});
    }
}

// update 

export const likePost = async function (req, res) {
    try {
      const id = req.params.id; // Extract the 'id' property from req.params
      const userId = req.body.userId;
  
      // Check if the post with the specified ID exists
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const isLiked = post.likes.get(userId);
  
      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
  
      const updatePost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      );
  
      return res.status(200).json(updatePost);
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  };
  