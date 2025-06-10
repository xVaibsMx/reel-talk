const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;
const Secret = process.env.SUPER_SECRET;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

const Users = mongoose.model("USERS", userSchema);

const authJwt = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({ message: "Token not provided." });
  }

  const token = authHeaders.split(" ")[1];

  jwt.verify(token, Secret, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    req.user = user;
    next();
  });
};

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .send({ message: "Please enter all the credentials!" });
  }

  try {
    const userExist = await Users.findOne({ username });

    if (userExist) {
      return res.status(409).send({ message: "Username already taken!" });
    }

    const newUser = new Users({ username, password, email });
    await newUser.save();

    const token = jwt.sign({ username }, Secret, { expiresIn: "1h" });

    return res.status(201).send({
      message: "User created successfully!",
      token: token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .send({ message: "Server error. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
