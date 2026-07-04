const User = require("../model/user");
const cloudinary = require("../config/cloudnary");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");

// Register //
const Registration = async (req, res) => {
  try {
    let profileimage = "";
    let publicId = "";
    const { email, password } = req.body;
    // check email
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    console.log(req.file);
    // Cloudinary upload

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images",
      });
      profileimage = result.secure_url;
      publicId = result.public_id;
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User

    const isDataAdded = await User.create({
      ...req.body,
      profileimage: profileimage,
      publicId: publicId,
      password: hashedPassword,
    });

    // DELETE LOCAL FILE
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    if (!isDataAdded) {
      return res.status(400).json({
        message: "Failed to register user",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User Register Succesfully",
      user: {
        id: isDataAdded._id,
        username: isDataAdded.username,
        email: isDataAdded.email,
        profileimage: isDataAdded.profileimage,
      },
    });
  } catch (error) {
    console.error("error registration", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


//........................ LOGIN ...................

const Login = async (req,res)=>{
  try {
    const {email,password} = req.body;
    const isEmailExist = await User.findOne({email});

    if(!isEmailExist){
      return res.status(404).json({
        message : "User not found"
      });
    }
    const passwordValid = await bcrypt.compare(
      password,
      isEmailExist.password
    );
    if(!passwordValid){
      return res.status(401).json({
        message:" Invalid Password"
      });
    }

    // TOKEN

const token = jwt.sign(
  { email : isEmailExist.email,
    id : isEmailExist._id,
    username: isEmailExist.username,
    profileimage: isEmailExist.profileimage,
    role: isEmailExist.role,
  },
  process.env.JWT_KEY,
  {
    expiresIn: "8h"
  }
);
// RESPONCE 
return res.status(200).json({
  success:true,
  message : "Login Succesfull",
  token:token,
    user :{
  id : isEmailExist._id,
  username : isEmailExist.username,
  email :isEmailExist.email,
  profileimage:isEmailExist.profileimage,
  publicId: isEmailExist.publicId,
  role: isEmailExist.role
},
});
 


    
  } catch (error) {
    console.error("Error during login",error);
    return res.status(500).json({
      message:"Internal server error",
    });
    
  };

};
//     PROFILE

const Profile = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(404).json({
        msg: "Profile Access Denied",
        success: false,
      });
    }
    // all data pabar jonno jonno profile e 
   const user = await User.findById(req.user.id).select("-password");
  //  
    return res.status(200).json({
      success: true,

      msg: "Profile Access Successfully",

      data:user,
    });

  } catch (error) {

    return res.status(500).json({
      msg: "Profile Access Denied",
      error: error.message,
    });
  }
};

// get all users

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");

  res.json({
    success: true,
    users,
  });
};

//  update controller
const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { username, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        role,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete image from cloudinary
    if (user.publicId) {
      await cloudinary.uploader.destroy(user.publicId);
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports ={
    Registration,
    Login,
    Profile,
    getAllUsers,
    UpdateUser,
    DeleteUser
}