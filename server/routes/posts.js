import  express  from "express";
import getFeedPosts from "../controllers/posts.js";
import getUserPosts from "../controllers/posts.js";
import likePost from "../controllers/posts.js";

import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

// read 

router.get("/",verifyUser,getFeedPosts);               //  main page feed 
router.get("/:userId/posts",verifyUser,getUserPosts);  //  specific users feed

// update
router.patch("/:id/like",verifyUser,likePost);     // when you like/unlike specific users post.

export default router;