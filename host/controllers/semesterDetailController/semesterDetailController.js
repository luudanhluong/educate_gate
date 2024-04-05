import createError from "http-errors";
import semesterDetails from "../../repositories/semesterDetails/index.js";
import userRepository from "../../repositories/user/index.js";
import semesterDAO from "../../repositories/semester/index.js";

const getSmtDetBySmtId = async (req, res, next) => {
  try {
    const { smtId } = req.params;
    res.send(await semesterDetails.getSmtDetailsBySmtId(smtId));
  } catch (error) {
    next(error);
  }
};

const addSmtDet = async (req, res, next) => {
  try {
    const { smtId } = req.params;
    const { formvalue, actions } = req.body;
    const semester = await semesterDAO.getSemesterById(smtId);
    if (semester?.[0]?.status !== "Upcoming") {
      res.send("Không thêm được");
      return;
    }
    let listSmtDet = [];
    if (!actions.payload)
      for (const element of formvalue) {
        listSmtDet.push({ userId: element, semesterId: smtId });
      }
    else {
      const listUsers = await userRepository.getUserByRole(actions.type, smtId);
      for (const element of listUsers) {
        listSmtDet.push({ userId: element, semesterId: smtId });
      }
    }
    const result = await semesterDetails.addSmtDetails(listSmtDet);
    if (result) res.send("Thêm thành công");
  } catch (error) {
    next(error);
  }
};
const getUserInSemester = async (req, res, next) => {
  try {
    const { skip } = req.query;
    const { smtId, role } = req.params;
    res.send(
      await semesterDetails.getUserInSemester(smtId, Number(role), Number(skip))
    );
  } catch (error) {
    next(error);
  }
};
const deleteDmtDetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    res.send(await semesterDetails.deleteDmtDetById(id));
  } catch (error) {
    next(error);
  }
};
export default {
  getSmtDetBySmtId,
  addSmtDet,
  getUserInSemester,
  deleteDmtDetById,
};
