import jwt from "jsonwebtoken";
import teacherDAO from "../../repositories/teacher/index.js";
const getClassListByTeacher = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  const tokenString = token.split(" ")[1];
  try {
    const decoded = jwt.verify(tokenString, process.env.SECRETKEY);
    req.user = decoded;
    console.log(decoded._id);
    const result = await teacherDAO.getClassByTeacherId(decoded._id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export default {
  getClassListByTeacher,
};
