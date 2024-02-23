import classRepository from "../../repositories/class/index.js";
import groupRepository from "../../repositories/group/index.js";
import classDAO from "../../repositories/class/index.js";
const createNewListClass = async (req, res) => {
  try {
    const { suffName, preName, quantity, limmitStudent } = req.body;
    const result = await classRepository.createNewListClass({
      suffName: suffName.toUpperCase(),
      preName: preName.toUpperCase(),
      quantity,
      limmitStudent,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getClasses = async (req, res, next) => {
  try {
    const { item, order, limit, skip } = req.query;
    const result = await classRepository.getClasses({
      item,
      order: Number(order),
      limit,
      skip,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const listGroupsInClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const groups = await groupRepository.getGroupsByClassId(classId);
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// GET /group/:groupId/details
const getGroupDetails = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const groupDetails = await groupRepository
      .findById(groupId)
      .populate("studentId");
    if (!groupDetails) {
      return res.status(404).send("Group not found");
    }
    res.json(groupDetails);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getStudentInClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const classInfo = await classDAO.getStudentsInClass(classId);
    if (!classInfo) {
      return res.status(404).json({ message: "Class not found" });
    }
    const students = await classDAO.getStudentsInClass(classId);
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students for class:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default {
  createNewListClass,
  getClasses,
  getGroupDetails,
  listGroupsInClass,
  getStudentInClass,
};
