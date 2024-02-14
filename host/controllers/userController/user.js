import userRepository from "../../repositories/user/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotnv from "dotenv";
dotnv.config();

const addNewUser = async (req, res, next) => {
  try {
    const { username, password, email, role } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await userRepository.createNewUser({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userRepository.loginUser({ email, password });
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const userProfile = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  const tokenString = token.split(" ")[1];
  try {
    const decoded = jwt.verify(tokenString, process.env.SECRETKEY);
    req.user = decoded;
    const result = await userRepository.userProfile(decoded._id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default {
  addNewUser,
  getUserLogin,
  userProfile,
};
