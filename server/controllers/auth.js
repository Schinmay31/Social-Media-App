import passport from "../config/passportConfig.js";
import { User } from '../model/User.js';



//  register user
export const register = async function (req, res) {
    try {
        const {
            firstName,
            lastName,
            email,
            picturePath,
            friends,
            location,
            occupation,
            password
        } = req.body;

        const newUser = new User({
            firstName,
            lastName,
            email,
            picturePath,
            friends,
            location,
            occupation
        });


        User.register(newUser, req.body.password, function (err, user) {
            if (err) {
                return res.status(500).json({ error: err.message });
            } else {
                passport.authenticate("local")(req, res, function () {
                    return res.status(201).json(user);
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
            firstName,
            lastName,
            email,
            picturePath,
            friends,
            location,
            occupation,
            password
        } = req.body;

        const currUser = new User({
            email,
            password
        });
        req.login(currUser, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).josn({ error: err.message });
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
                    return res.status(201).json(response);
                });
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
} 