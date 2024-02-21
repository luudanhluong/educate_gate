import adminsRepository from "../../repositories/admins/index.js";

const getUsers = async (req, res) => {
  try {
    const { item, order, skip, limit, role } = req.query;
    const result = await adminsRepository.getUsers({
      item,
      order,
      skip,
      limit,
      role,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const insertListUsers = async (req, res, next) => {
  try {
    const password = "Aa@123";
    const saltRounds = 12;
    const excelFilePath = req.file.path;
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const userData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const newData = [];
    for (const user of userData) {
      try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
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
  getUsers,
  insertListUsers,
};
