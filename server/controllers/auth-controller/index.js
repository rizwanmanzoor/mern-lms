const bcrypt = require("bcryptjs");
const User = require("../../models/User.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;

  const existingUser = await User.findOne({
    $or: [{ userName }, { userEmail }]
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "username or email already exists"
    })
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    userEmail,
    role,
    password: hashPassword
  })

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "user registered successfully"
  })
}

const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  const existingUser = await User.findOne({ userEmail });

  if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
    return res.status(401).json({
      success: false,
      message: "invalid credentials"
    })
  }

  const accessToken = jwt.sign({
    _id: existingUser._id,
    userName: existingUser.userName,
    userEmail: existingUser.userEmail,
    role: existingUser.role
  }, "JWT_SECRET", { expiresIn: "120m" });

  return res.status(200).json({
    success: true,
    message: "user logged in successfully",
    data: {
      accessToken,
      user: {
        _id: existingUser._id,
        userName: existingUser.userName,
        userEmail: existingUser.userEmail,
        role: existingUser.role
      }
    }
  })
}

module.exports = { registerUser, loginUser };