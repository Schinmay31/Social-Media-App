import { User } from "../model/User.js";
import mongoose from "mongoose";

// read functions

export const getUser = async function (req, res) {
    try {
        const { id } = req.query;
        console.log('Received user ID:', id);

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
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
            ({ _id, userName}) => {
                return {  _id,userName };
            }
        );
        return res.status(200).json(formattedList);

    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

export const searchUser = async function(req,res){
    try{
    const {query} = req.query;

    const users = await User.find({
        userName : { $regex: `^${query}`}
    }).limit(5);

    return res.status(200).json(users);
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}


// update 

export const addRemoveFriend = async function (req, res) {           // followers and following system.
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        let isFriend = false;

        if (user.friends.includes(friendId)) {            // if user.friends Array has id of friendID that means they are aleady frinds and one want remove other from friendslist -> (Remove Friend)
            user.friends = user.friends.filter(f => f !== friendId);
            // friend.friends = friend.friends.filter(f => f !== id);
            isFriend = false;
        }
        else {                   // when one wants to add other to their friend List -> (Add Friend)
            user.friends.push(friendId);
            isFriend = true;
            // friend.friends.push(id);
        }
        await user.save();
        // await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(                       // formatting the data into desired format
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        return res.status(200).json({formattedFriends, isFriend});


    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}