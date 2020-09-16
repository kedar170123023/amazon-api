import express from "express";
const router = express.Router();
import User from "../models/userModel";
import {getToken} from "../util";






router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  const token = getToken(signinUser);
  if (signinUser) {
    const response = {
      _id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: token,
    }
    res.send(response);
  }
  
  else {
    console.log("else");
    res.status(401).send({msg : "Invalid Email or Password"});
  }
});

router.post("/register", async (req, res) => {
  console.log("register : ", req.body);

  const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
  });
  
  try {

    const newUser = await user.save(); 
  
  

  if(newUser){
    res.send({
      _id : newUser._id,
      email : newUser.email,
      isAdmin : newUser.isAdmin,
      token : getToken(newUser)
    })
  }

}

  catch {
    res.status(401).send({msg : 'Invalid User Data'});
  }

  }
);
router.get("/createadmin", async (req, res) => {
  console.log("trying to connect server");
  try {
    const user = new User({
      name: "Kedar",
      email: "kena421@gmail.com",
      password: 1234,
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (err) {
    res.send({ msg: err.message });
  }
});

export default router;
