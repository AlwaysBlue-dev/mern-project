const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../DB/conn");
const User = require("../model/userSchema");
const authenticate = require("../middleware/authenticate");



router.get("/", (req, res) => {
  res.send("Hello from server");
});

// using asynch-await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword, rating } = req.body;
  // console.log(name);

  if (!name || !email || !phone || !work || !password || !cpassword || !rating) {
    return res.status(422).json({ error: "Please fill the fields properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword, rating });
      //middleware hashing password
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route
router.post("/signin", async (req, res) => {
  // console.log(req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Please filled the fields" });
    }

    const userLogin = await User.findOne({ email: email });
    //console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      //generating token
      const token = await userLogin.generateAuthToken();
      // console.log(token);

      //saving token in cookie
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000), //expires in 30 days
        httpionly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({ message: "User signin succesfull" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

//About page
router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// get user data for contact us and home page
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// contact page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "Please filled the contact form" });
    }
    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "User Contact Successsfully" });
    }
  } catch (err) {
    console.lgo(err);
  }
});

//Logout page
router.get("/logout", authenticate, (req, res) => {
  console.log("Hello Logout Page");
  res.clearCookie("jwtoken", { path: "/" });
  res.stauts(200).send("User Logout");
});

module.exports = router;

// using promises
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   // console.log(name);

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Please fill the fields properly" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email already exist" });
//       }
//       const user = new User({ name, email, phone, work, password, cpassword });
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "User registered successfully" });
//         })
//         .catch((err) => {
//           res.status(500).json({ error: "Failed to registered" });
//         });
//     })
//     .catch((err) => {
//       console.log("Failed to registered");
//     });
// });
