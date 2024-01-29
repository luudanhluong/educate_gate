import userRepository from "../../repositories/user/index.js";
import bcrypt from "bcrypt";
import xlsx from "xlsx";

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
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const insertListUsers = async (req, res, next) => {
  try {
    const saltRounds = 12;
    const excelFilePath = req.file.path;
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const userData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const newData = [];
    for (const user of userData) {
      try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(
          user.password.toString(),
          salt
        );
        newData.push({ ...user, password: hashedPassword });
      } catch (error) {
        console.error("Error hashing password:", error);
      }
    }
    const result = await userRepository.createListUsers(newData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  addNewUser,
  getUserLogin,
  insertListUsers,
};
