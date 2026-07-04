const express = require("express");
const authController = require("../controller/auth.controller");
const userValidatorSchema = require("../validator/user.validator");
const JoiValidatorMiddleware = require("../middleware/joivalidator.middleware");
const Uploder = require("../middleware/Uploader");
const JwtVerify = require("../middleware/jwtVerify");
const isAdmin = require("../middleware/admin");

const router = express.Router();

router.post(
  "/register",
  Uploder.single("profileimage"),
  JoiValidatorMiddleware(userValidatorSchema.userSchema),
  authController.Registration
);

router.post(
  "/login",
  JoiValidatorMiddleware(userValidatorSchema.LoginSchema),
  authController.Login
);

router.get("/profile", JwtVerify, authController.Profile);

// Admin Routes
router.get(
  "/admin/users",
  JwtVerify,
  isAdmin,
  authController.getAllUsers
);

router.put(
  "/admin/users/:id",
  JwtVerify,
  isAdmin,
  authController.UpdateUser
);

router.delete(
  "/admin/users/:id",
  JwtVerify,
  isAdmin,
  authController.DeleteUser
);

module.exports = router;