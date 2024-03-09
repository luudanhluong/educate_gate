import createError from "http-errors";
import semesterDetails from "../../repositories/semesterDetails/index.js";
import userRepository from "../../repositories/user/index.js";

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
    let listSmtDet = [];
    if (!actions.payload)
      for (const element of formvalue) {
        listSmtDet.push({ userId: element, semesterId: smtId });
      }
    else {
      const listUsers = await userRepository.getUserByRole(actions.type);
      for (const element of listUsers) {
        listSmtDet.push({ userId: element, semesterId: smtId });
      }
    }
    const result = await semesterDetails.addSmtDetails(listSmtDet, actions);
    if (result) res.send("Thêm thành công");
  } catch (error) {
    next(error);
  }
};
export default {
  getSmtDetBySmtId,
  addSmtDet,
};
