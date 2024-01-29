import Mentor from "../../models/mentorModel.js";
import Student from "../../models/studentModel.js";
import Teacher from "../../models/teacherModel.js";
import Admin from "../../models/adminModel.js";
import UserToken from "../../models/userToken.js";
import jwt from "jsonwebtoken";
import dotnv from "dotenv";
import bcrypt from "bcrypt";

const createNewUser = async ({ username, email, password, role }) => {
  const formData = { username, email, password };
  const teacherObj = await Teacher.findOne({ email: email }).exec();
  const studentObj = await Student.findOne({ email: email }).exec();
  const mentorObj = await Mentor.findOne({ email: email }).exec();
  const adminObj = await Admin.findOne({ email: email }).exec();
  const check = !teacherObj && !studentObj && !mentorObj && !adminObj;
  try {
    if (role === "teacher") {
      if (check) {
        const teacher = await Teacher.create(formData);
        return teacher._doc;
      } else {
        throw new Error("Email đã tồn tại trong hệ thống");
      }
    } else if (role === "student") {
      if (check) {
        const student = await Student.create(formData);
        return student._doc;
      } else {
        throw new Error("Email đã tồn tại trong hệ thống");
      }
    } else if (role === "mentor") {
      if (check) {
        const mentor = await Mentor.create(formData);
        return mentor._doc;
      } else {
        throw new Error("Email đã tồn tại trong hệ thống");
      }
    } else if (role === "admin") {
      if (check) {
        const admin = await Admin.create(formData);
        return admin._doc;
      } else {
        throw new Error("Email đã tồn tại trong hệ thống");
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const createListUsers = async (listData) => {
  //   const formData = { username, email, password };
  //   const teacherObj = await Teacher.findOne({ email: email }).exec();
  //   const studentObj = await Student.findOne({ email: email }).exec();
  //   const mentorObj = await Mentor.findOne({ email: email }).exec();
  //   const adminObj = await Admin.findOne({ email: email }).exec();
  //   const check = !teacherObj && !studentObj && !mentorObj && !adminObj;
  try {
    // if (role === "teacher") {
    const teacher = await Teacher.insertMany(listData);
    return teacher._doc;
    //   if (check) {
    //   } else {
    //     throw new Error(`Email: ${email} đã tồn tại trong hệ thống`);
    //   }
    // } else if (role === "student") {
    //   if (check) {
    //     const student = await Student.insertMany(formData);
    //     return student._doc;
    //   } else {
    //     throw new Error(`Email: ${email} đã tồn tại trong hệ thống`);
    //   }
    // } else if (role === "mentor") {
    //   if (check) {
    //     const mentor = await Mentor.insertMany(formData);
    //     return mentor._doc;
    //   } else {
    //     throw new Error(`Email: ${email} đã tồn tại trong hệ thống`);
    //   }
    // }
  } catch (e) {
    throw new Error(e.message.toString());
  }
};

const loginUser = async ({ email, password }) => {
  try {
    dotnv.config();
    const token = jwt.sign({ email, password }, process.env.SECRETKEY, {
      expiresIn: "2h",
    });
    const teacher = await Teacher.findOne({ email: email });
    const student = await Student.findOne({ email: email });
    const mentor = await Mentor.findOne({ email: email });
    const admin = await Admin.findOne({ email: email });
    if (teacher) {
      const isPasswordTeacher = await bcrypt.compare(
        password,
        teacher.password
      );
      if (isPasswordTeacher) {
        saveTokenToDatabase(
          teacher._id,
          "teacher",
          token,
          new Date(Date.now() + 60 * 60 * 1000 * 2)
        );
        return { ...teacher._doc, role: "teacher", token };
      } else return res.status(401).json({ error: "Mật khẩu không đúng." });
    } else if (mentor) {
      const isPasswordMentor = await bcrypt.compare(password, mentor.password);
      if (isPasswordMentor) {
        saveTokenToDatabase(
          mentor._id,
          "mentor",
          token,
          new Date(Date.now() + 60 * 60 * 1000 * 2)
        );
        return { ...mentor._doc, role: "mentor", token };
      } else return res.status(401).json({ error: "Mật khẩu không đúng." });
    } else if (student) {
      const isPasswordStudent = await bcrypt.compare(
        password,
        student.password
      );
      if (isPasswordStudent) {
        saveTokenToDatabase(
          student._id,
          "student",
          token,
          new Date(Date.now() + 60 * 60 * 1000 * 2)
        );
        return { ...student._doc, role: "student", token };
      } else return res.status(401).json({ error: "Mật khẩu không đúng." });
    } else if (admin) {
      const isPasswordAdmin = await bcrypt.compare(password, admin.password);
      if (isPasswordAdmin) {
        saveTokenToDatabase(
          admin._id,
          "admin",
          token,
          new Date(Date.now() + 60 * 60 * 1000 * 2)
        );
        return { ...admin._doc, role: "admin", token };
      } else return res.status(401).json({ error: "Mật khẩu không đúng." });
    }
    return res.status(404).json({ error: "Người dùng không tồn tại." });
  } catch (e) {
    throw new Error(e.message.toString());
  }
};
const saveTokenToDatabase = async (userId, role, token, expiresIn) => {
  console.log({
    userId: userId,
    userType: role,
    token: token,
    expiresIn: expiresIn,
  });
  try {
    await UserToken.create({
      userId: userId,
      userType: role,
      token: token,
      expiresIn: expiresIn,
    });
  } catch (e) {
    throw new Error(e.message.toString());
  }
};
export default {
  createNewUser,
  loginUser,
  createListUsers,
};
