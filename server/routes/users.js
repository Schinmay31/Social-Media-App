import  express  from "express";
import {getUser} from "../controllers/users.js";
import {getUserFriends} from "../controllers/users.js";
import {addRemoveFriend} from "../controllers/users.js";
import {verifyToken, verifyUser} from "../middleware/auth.js";
import {getUserList} from "../controllers/users.js";
import { searchUser } from "../controllers/users.js";


const router = express.Router();


// read operations

router.get("/:id",verifyUser,getUser); // get req to any user account.
router.get("/",verifyToken,getUserList);  // get req to server for all users list.

router.get("/:id/friends",verifyToken,getUserFriends); // get req to users friend-list.
router.get("/search",searchUser);

// update function
router.patch("/:id/:friendId",verifyToken,addRemoveFriend);   // update req to add or remove friend.

export default router;
