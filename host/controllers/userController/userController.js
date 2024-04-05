import userDAO from "../../repositories/user/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotnv from "dotenv";
dotnv.config();

const addNewUser = async (req, res, next) => {
  try {
    const { username, password, email, role } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await userDAO.createNewUser({
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
    const result = await userDAO.loginUser({ email, password });
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
    const result = await userDAO.findUserById(decoded._id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const userUpdateProfile = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  const tokenString = token.split(" ")[1];
  try {
    const { username, gender, Dob, phoneNumber, menteeCount, degree } =
      req.body;
    const decoded = jwt.verify(tokenString, process.env.SECRETKEY);
    req.user = decoded;
    const { _id } = decoded;
    const result = await userDAO.userUpdateProfile(_id, {
      username,
      gender,
      Dob,
      phoneNumber,
      menteeCount,
      degree,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserWithoutSmt = async (req, res, next) => {
  try {
    const { smtId } = req.params;
    const { skip, role } = req.query;
    res.send(
      await userDAO.getUserWithoutSmt(
        smtId,
        Number.parseInt(skip),
        Number.parseInt(role)
      )
    );
  } catch (error) {
    next(error);
  }
};
// Thống kê người dùng theo năm
const pmtUser = async (req, res, next) => {
  try {
    res.send(await userDAO.pmtUser());
  } catch (error) {
    next(error);
  }
};

export default {
  addNewUser,
  getUserLogin,
  userProfile,
  userUpdateProfile,
  getUserWithoutSmt,
  pmtUser,
};
