import passport from "../config/passportConfig.js";
import { User } from '../model/User.js';
import  jwt  from "jsonwebtoken";

const secretKey  = "12345678"
const generateToken = (user) => {
    // Create a JWT token with user information
    return jwt.sign({  userName: user.userName }, secretKey, { expiresIn: '4h' });
};

//  register user
export const register = async function (req, res) {
    try {
        const {
            userName,
            email,
            password
        } = req.body;

        const newUser = new User({
            userName,
            firstName : null,
            lastName : null,
            email,
            picturePath : null,
            friends : [],
            location : null,
            occupation : null,
            
        });


        User.register(newUser, req.body.password, function (err, user) {
            if (err) {
                return res.status(500).json({ error: err.message });
            } else {
                passport.authenticate("local")(req, res, function () {
                   const token =  generateToken(user)
                    return res.status(201).json({user, token});
                });
            }

        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// login fucntion
export const login = async function (req, res) {
    try {
        const {
        userName,
         password
        } = req.body;

        const currUser = new User({
            userName,
            password
        });
        req.login(currUser, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: err.message });
            }
            else {
                passport.authenticate("local")(req, res, function () {
                    const response = {
                        message: "Login successful",
                        user: {

                            id: req.user._id,
                            username: req.user.email,
                            firstName: req.user.firstName,
                            lastName: req.user.lastName,
                            friends: req.user.friends,
                            location: req.user.location,
                            occupation: req.user.occupation,

                        }

                    };
                    const token =  generateToken(currUser)
                    return res.status(201).json({response,token});
                });
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
} 
export const verifyLogin = (req, res) => {
    res.json({
        user : req.user.userName
    })
}