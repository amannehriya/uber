const express = require("express");
const router = express.Router();
const {registerUser,loginUser,logoutUser,profileUser} = require("../controllers/userController");
const {isLoggedIn} = require("../middlewares/isLoggedIn");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/profile",isLoggedIn,profileUser);

module.exports = router;
