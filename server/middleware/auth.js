import { Jwt } from "jsonwebtoken";

export const verifyToken = async function(req,res,next){
    try{
      let token = req.header("Auther")
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}