import semesterDAO from "../../repositories/semester/index.js";

const getAllSemesters = async (req, res, next) => {
  try {
    res.status(200).json(await semesterDAO.getAllSemesters());
  } catch (error) {
    next(error);
  }
};
const getSemestersUpcoming = async (req, res, next) => {
  try {
    res.status(200).json(await semesterDAO.getSemestersUpcoming());
  } catch (error) {
    next(error);
  }
};
const createNewSemester = async (req, res) => {
  try {
    const { name } = req.body;
    res.status(200).json(await semesterDAO.createNewSemester(name));
  } catch (error) {
    next(error);
  }
};

const updateSemester = async (req, res) => {
  try {
    const { status, name } = req.body;
    const { id } = req.params;
    res
      .status(200)
      .json(await semesterDAO.updateSemester(id, { status, name }));
  } catch (error) {
    next(error);
  }
};
const deleteSemester = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json(await semesterDAO.deleteSemester(id));
  } catch (error) {
    next(error);
  }
};

export default {
  deleteSemester,
  updateSemester,
  createNewSemester,
  getAllSemesters,
  getSemestersUpcoming,
};
