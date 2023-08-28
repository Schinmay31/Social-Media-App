import bcrypt from "bcrypt";
import Jwt  from "jsonwebtoken";
import User from "../model/User.js";


//  reister user

export const register = async function(req,res){
    try{
        const{                  // Destructuring the req.body
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation 
        } = req.body;
        
        const salt = await bcrypt.genSalt();                  // 
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser =new User ({
            firstName,
            lastName,
            email,
            password : passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfiles : 100,
            impressions : 290
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
       res.status(500).json({error: err.message });
    }
}


// login fucntion
export const login = async function(req,res){
    try{
     const{email , password}  = req.body;
     const user = await User.findOne({email : email });

     if(!user) return res.status(400).json({msg : "user does not exist"});

     const isMatch = await bcrypt.compare(password,user.password);

     if(!isMatch) return res.status(400).json({msg:"Invalid credentials"});

     const token = Jwt.sign({id:user._id},process.env.JWT_SECRET );

     delete user.password;

    
    }catch(err){ 
          res.status(500).json({error : err.message});
    }
} 