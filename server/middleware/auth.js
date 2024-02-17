import session from "express-session";
import jwt from 'jsonwebtoken';

const secretKey = '12345678'
export const verifyToken = (req,res ,next) => {
  const token = req.headers.authorization;
  if(!token){
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  
  }
  try{
    const decoded = jwt.verify(token,secretKey)
    req.user = decoded;
    next();
  }catch (error) {
    
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}

export const verifyUser = async function(req,res,next){

  if(req.isAuthenticated()){
    return next();             //  User is authenticated, proceed to the next middleware
  }
  res.status(401).json({ message: "Unauthorized" }); // User is not authenticated
}