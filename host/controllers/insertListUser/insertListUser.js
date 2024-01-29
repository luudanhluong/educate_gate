import user from "../../repositories/user/index.js";
import xlsx from "xlsx";
import bcrypt from "bcrypt";

const insertListUsers = async (req, res, next) => {
  try {
    const saltRounds = 12;
    const excelFilePath = req.file.path;
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const userData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    console.log(userData);
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
    // const result = await user.createListUsers(newData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  insertListUsers,
};
