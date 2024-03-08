import createError from "http-errors";
import semesterDetails from "../../repositories/semesterDetails/index.js";

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
    const { listUserAdd, listUserDel } = req.body;
    let listSmtDet = [];
    if (listUserAdd.length > 0)
      for (const element of listUserAdd) {
        listSmtDet.push({ userId: element, semesterId: smtId });
      }
    const result = await semesterDetails.addSmtDetails(listSmtDet, listUserDel);
    if (result) res.send("Thêm thành công");
  } catch (error) {
    next(error);
  }
};
export default {
  getSmtDetBySmtId,
  addSmtDet,
};
