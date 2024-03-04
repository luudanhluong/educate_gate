import Class from "../../models/classModel.js";
import User from "../../models/userModel.js";

const createNewListClass = async ({
  suffName,
  preName,
  quantity,
  limmitStudent,
}) => {
  try {
    const listExistWithPreName = await Class.countDocuments({
      preName: preName,
    }).exec();
    const data = [];
    for (let index = 1; index <= quantity; index++) {
      data.push({
        suffName,
        preName,
        code: index + listExistWithPreName,
        limmitStudent,
      });
    }
    const result = await Class.create(data);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getClasses = async ({ item, order, limit, skip }) => {
  try {
    let query = {};
    // if (search && search.length > 0) {
    //   query.email = { $regex: new RegExp(search, "i") };
    // }
    // if (role && role > 0) {
    //   query.role = role;
    // }
    const listClass = await Class.find(query)
      .sort({ [item]: order })
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await Class.countDocuments(query).exec();
    return { data: listClass, total, skip, limit };
  } catch (error) {
    throw new Error(error.message);
  }
};
const getStudentsInClass = async (classId) => {
  try {
    const students = await User.find({ classId: classId })
      .populate("classId")
      .exec();
    return students;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findClassById = async (classId) => {
  try {
    const result = await Class.findOne({ _id: classId });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default {
  createNewListClass,
  getClasses,
  getStudentsInClass,
  findClassById,
};
