import adminsRepository from "../../repositories/admins/index.js";
import classRepository from "../../repositories/class/index.js";
import xlsx from "xlsx";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  try {
    const { item, order, skip, limit, role, search } = req.query;
    const result = await adminsRepository.getUsers({
      item,
      order: Number(order),
      skip: Number(skip),
      limit,
      role: Number(role),
      search,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const insertListUsers = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const saltRounds = 12;
    const { file } = req.body;
    const newData = await Promise.all(
      file.map(async (user) => {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );
    const result = await adminsRepository.createListUsers(newData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNewListClass = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const { suffName, preName, quantity, limitStudent } = req.body;
    let result;
    if (!preName) {
      const excelFilePath = req.file.path;
      const workbook = xlsx.readFile(excelFilePath);
      const sheetName = workbook.SheetNames[0];
      const userData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      result = await adminsRepository.createNewListClassesFromFile(userData);
    }
    result = await adminsRepository.createNewListClass({
      suffName,
      preName,
      quantity,
      limitStudent,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getClasses = async (req, res, next) => {
  try {
    const { item, order, limit, skip, preName, search } = req.query;
    const result = await adminsRepository.getClasses({
      item,
      order: Number(order || 1),
      limit: Number(limit || 10),
      skip: Number(skip || 0),
      preName,
      search: search,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addStuentdInClass = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const result = await adminsRepository.addStudentInClasses();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteClassEmpty = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const result = await adminsRepository.deleteClassEmpty();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addTeacherInClass = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const result = await adminsRepository.addTeacherInClass();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllCategories = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    res.status(200).json(await adminsRepository.getAllCategories());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllSemesters = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    res.status(200).json(await adminsRepository.getAllSemesters());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addNewCategory = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const { name } = req.body;
    res.status(200).json(await adminsRepository.addNewCategory(name));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createNewSemester = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const { name } = req.body;
    res.status(200).json(await adminsRepository.createNewSemester(name));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateCategory = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const { status, name } = req.body;
    const { id } = req.params;
    res
      .status(200)
      .json(await adminsRepository.updateCategory(id, { status, name }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateSemester = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const { status, name } = req.body;
    const { id } = req.params;
    res
      .status(200)
      .json(await adminsRepository.updateSemester(id, { status, name }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteSemester = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const { id } = req.params;
    res.status(200).json(await adminsRepository.deleteSemester(id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteCategory = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const { id } = req.params;
    res.status(200).json(await adminsRepository.deleteCategory(id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default {
  getUsers,
  insertListUsers,
  getClasses,
  createNewListClass,
  addStuentdInClass,
  deleteClassEmpty,
  addTeacherInClass,
  getAllCategories,
  addNewCategory,
  updateCategory,
  updateSemester,
  createNewSemester,
  getAllSemesters,
  deleteSemester,
  deleteCategory,
};
