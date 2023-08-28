import session from "express-session";


export const verifyUser = async function(req,res,next){

  if(req.isAuthenticated()){
    return next();             //  User is authenticated, proceed to the next middleware
  }
  res.status(401).json({ message: "Unauthorized" }); // User is not authenticated
}