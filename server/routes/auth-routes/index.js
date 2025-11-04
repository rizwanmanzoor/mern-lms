const express = require("express");
const { registerUser, loginUser } = require("../../controllers/auth-controller/index");
const authenticateMiddleware = require("../../middlewares/auth-middleware")


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("check-auth", authenticateMiddleware, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    message: "user is authenticated",
    data: {
      user
    }
  })
})

module.exports = router;