import jwt from "jsonwebtoken";
import config from "./config";


export const getToken = (user) => jwt.sign(
  {
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    name: user.name,
  },
  config.JWT_SECRET,
  {
    expiresIn: '48h',
  },
);


export const isAuth = (req, res, next) =>{
  const token  = req.headers.authorization;
  if(token){
    // get token after Bearer
    const userToken = token.slice(7, token.length);
    // check token is valid
    jwt.verify(userToken, config.JWT_SECRET, (err, decode)=>{
      if(err){
        return res.status(401).send({msg:'invalid Token'});
      }
      // if token is valid
      console.log("token assigned to req.user ", decode);
      req.user = decode;
      next();
      return ;
    });
  }
  else{
    return res.status(401).send({msg:"Token is not supplied"});
  }
}


export const isAdmin = (req, res, next) =>{
  if(req.user && req.user.isAdmin){
    return next();
  }
  return res.status(401).send({msg:"Admin token not supplied"});
}
