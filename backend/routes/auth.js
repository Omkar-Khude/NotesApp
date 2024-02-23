const express = require("express");
const { post } = require("mongoose");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var fetchuser = require("../middleware/fetchuser");
var jwt = require("jsonwebtoken");

// secret key for jwt token
const JWT_SECRET = "abcdefghijklmnopqrstuvwxyz";

// post api creation for create user
router.post(
  "/createUser",
  [
    body("name", "Enter the valid name").isLength({ min: 3 }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter the valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    try {
      // check whether the user exists with the same email
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success:false, error: "Please enter the unique email" });
      }

      // password encryption using bcrypt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //jwt token generation
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({success:true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// post api creation for login user
router.post(
  "/loginUser",
  [
    body("email", "enter the valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // check email exists or not
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success:false,  error: "Invalid Credentials!" });
      }

      // check password is correct or not
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({success:false,  error: "Invalid Credentials!" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
     
      res.json({success:true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error ");
    }
  }
);

// post api creation for authentication of a user - login required 
router.post("/getUser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error ");
  }
});

// get api creation for fetching user details - login required
router.get("/fetchUserDetails", fetchuser, async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});


// put api to update the userDetails - login required
router.put("/updateUser/:id", fetchuser, async (req, res) => {
  const { name, email} = req.body;
  try {
    // logic to create new user object
    const newUser = {};
    if (name) {
      newUser.name = name;
    }
    if (email) {
      newUser.email = email;
    }

    // Find the user to be updated by userId
    let userDetails = await User.findById(req.params.id);
    if (!userDetails) {
      return res.status(404).send("User Not Found");
    }

    // Check if the logged-in user is updating their own details
    if (userDetails._id.toString() !== req.user.id) {
      return res.status(401).send("You are not allowed to update this user");
    }

    // Update the user details
    userDetails = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    );
    res.json({ userDetails });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
