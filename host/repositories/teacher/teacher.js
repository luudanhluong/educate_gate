import Class from "../../models/classModel.js";

const getClassByTeacherId = async (teacherId) => {
  try {
    const students = await Class.find({ teacherId: teacherId });
    return students;
  } catch (error) {
    console.error("Error querying database:", error);
    throw new Error("Internal Server Error");
  }
};

export default {
  getClassByTeacherId,
};
