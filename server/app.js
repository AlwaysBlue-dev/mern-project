const dotenv = require("dotenv");
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

dotenv.config({ path: path.join(__dirname, "./config.env") });
// dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(express.json());

// link the route files to make our route easy
app.use(require("./router/auth"));

const PORT = process.env.PORT;

// app.get("/about",(req, res) => {
//   res.send("Hello from about");
// });

// app.get("/contact", (req, res) => {
//   res.send("Hello from contact");
// });
app.get("/signin", (req, res) => {
  res.send("Hello from login");
});

app.get("/signup", (req, res) => {
  res.send("Hello from signup");
});

// //for heroku
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
// }

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
