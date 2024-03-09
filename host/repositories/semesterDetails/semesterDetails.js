import SemesterDetail from "../../models/SemesterDetail.js";

const getSmtDetailsBySmtId = async (smtId) => {
  try {
    return await SemesterDetail.find({ semesterId: smtId }).exec();
  } catch (error) {
    throw new Error(error.message);
  }
};

const addSmtDetails = async (listSmtDet, listUserDel) => {
  try {
    await SemesterDetail.deleteMany({
      userId: { $in: listUserDel },
    });
    return await SemesterDetail.insertMany(listSmtDet);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getSmtDetailsBySmtId,
  addSmtDetails,
};
