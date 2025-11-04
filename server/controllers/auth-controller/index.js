const bcrypt = require("bcryptjs");
const User = require("../../models/User.model");

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

module.exports = { registerUser };