import { User } from "../model/User.js";

// read functions

export const getUser = async function (req, res) {               // to find given user
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

export const getUserFriends = async function (req, res) {        // to find given users friend list
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(               // formatting the data into desired format
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        return res.status(200).json(formattedFriends);
    }
    catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

export const getUserList = async function(req,res){
    try{
          const userList = await User.find();

          const formattedList = userList.map(               // formatting the data into desired format
            ({ _id, firstName, lastName}) => {
                return {  _id,firstName, lastName };
            }
        );
        return res.status(200).json(formattedList);

    }catch(err){
        return res.status(500).json({message : err.message});
    }
}


// update 

export const addRemoveFriend = async function (req, res) {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {            // if user.friends Array has id of friendID that means they are aleady frinds and one want remove other from friendslist -> (Remove Friend)
            user.friends = user.friends.filter(f => f !== friendId);
            friend.friends = friend.friends.filter(f => f !== id);
        }
        else {                   // when one wants to add other to their friend List -> (Add Friend)
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(                       // formatting the data into desired format
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        return res.status(200).json(formattedFriends);


    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}