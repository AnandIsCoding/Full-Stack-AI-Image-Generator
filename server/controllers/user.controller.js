import userModel from "../models/user.model.js";
import validateSignupdata from "../helpers/validateSignupdata.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signupController = async (req, res) => {
  try {
    const validationResult = validateSignupdata(req);
    if (validationResult) {
      return res
        .status(validationResult.status)
        .json({ success: false, message: validationResult });
    }
    const { userName, email, password } = req.body;
    //check if user already registered with entered email
    const userAlreadyregistered = await userModel.findOne({ email });
    if (userAlreadyregistered)
      return res
        .status(409)
        .json({ success: false, message: "user already registered " });
    //hash the password
    const encryptedpassword = await bcrypt.hash(password, 10);
    //save entry
    await userModel.create({
      userName,
      password: encryptedpassword,
      email,
    });

    return res
      .status(201)
      .json({ message: "User registered Success", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error("Signup Error:", error.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }
    //if no userAvailable with this email return invalid credentials
    const userAvailable = await userModel.findOne({ email });
    if (!userAvailable)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    //compare password enter with encryptedpassword
    const passwordMatch = await bcrypt.compare(
      password,
      userAvailable.password
    );
    if (!passwordMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    //generate token
    

    const token = jwt.sign(
      { _id: userAvailable._id },
      process.env.PRIVATE_KEY,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
     httpOnly: true,
      sameSite: "None",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return res
      .status(200)
      .json({
        message: `Welcome ${userAvailable.userName}`,
        success: true, userCredits : userAvailable.userAvailablecredits, userName: userAvailable.userName, userToken:token 
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error("Login Error:", error.message);
  }
};

