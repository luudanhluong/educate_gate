import adminsDAO from "../../repositories/admins/index.js";
import xlsx from "xlsx";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  try {
    const { item, order, skip, limit, role, search } = req.query;
    const result = await adminsDAO.getUsers({
      item,
      order: Number(order),
      skip: Number(skip),
      limit,
      role: Number(role),
      search,
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};
const deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    res.send(await adminsDAO.deleteUserById(userId));
  } catch (error) {
    next(error);
  }
};
const insertListUsers = async (req, res, next) => {
  try {
    const saltRounds = 12;
    const { file } = req.body;
    const password = "Aa@123";
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newData = await Promise.all(
      file.map(async (user) => {
        return { ...user, password: hashedPassword };
      })
    );
    const result = await adminsDAO.createListUsers(newData);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createClass = async (req, res, next) => {
  try {
    const data = req.body;
    let result;
    if (!data?.className) {
      result = await adminsDAO.createNewListClasses(data);
    } else result = await adminsDAO.createNewClass(data);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
const getClasses = async (req, res, next) => {
  try {
    const { item, order, limit, skip, preName, search } = req.query;
    const result = await adminsDAO.getClasses({
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
    const result = await adminsDAO.addStudentInClasses();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteClassEmpty = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const result = await adminsDAO.deleteClassEmpty();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addTeacherInClass = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const result = await adminsDAO.addTeacherInClass();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllCategories = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    res.status(200).json(await adminsDAO.getAllCategories());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addNewCategory = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const { name } = req.body;
    res.status(200).json(await adminsDAO.addNewCategory(name));
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
    res.status(200).json(await adminsDAO.updateCategory(id, { status, name }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteCategory = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const { id } = req.params;
    res.status(200).json(await adminsDAO.deleteCategory(id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default {
  getUsers,
  insertListUsers,
  getClasses,
  createClass,
  addStuentdInClass,
  deleteClassEmpty,
  addTeacherInClass,
  getAllCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
  deleteUserById,
};
