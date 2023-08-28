import  express  from "express";
import {getUser} from "../controllers/users.js";
import {getUserFriends} from "../controllers/users.js";
import {addRemoveFriend} from "../controllers/users.js";
import {verifyUser} from "../middleware/auth.js";


const router = express.Router();


// read operations

router.get("/:id",verifyUser,getUser); // get req to any user 

router.get("/:id/friends",verifyUser,getUserFriends); // get req to users friend-list

// update function
router.patch("/:id/:friendId",verifyUser,addRemoveFriend);   // update req to add or remove friend.

export default router;
