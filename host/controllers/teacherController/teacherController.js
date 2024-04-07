import jwt from "jsonwebtoken";
import teacherDAO from "../../repositories/teacher/index.js";
import userDAO from "../../repositories/user/index.js";

const getClassListByTeacher = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  const tokenString = token.split(" ")[1];
  try {
    const decoded = jwt.verify(tokenString, process.env.SECRETKEY);
    req.user = decoded;
    const result = await teacherDAO.getClassByTeacherId(decoded._id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
const suggestMatching = async (req, res) => {
  try {
    const { teacherId } = req.params;
    res.send(await teacherDAO.suggestMatching(teacherId));
  } catch (error) {
    next(error);
  }
};

const getGroupsByTeacherId = async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    res.send(await teacherDAO.getGroupsByTeacherId(teacherId));
  } catch (error) {
    next(error);
  }
};
const getTeacher = async (req, res, next) => {
  try {
    res.send(await userDAO.getUserByRole(2, "InActive"));
  } catch (error) {
    next(error);
  }
};
export default {
  getClassListByTeacher,
  suggestMatching,
  getGroupsByTeacherId,
  getTeacher,
};
