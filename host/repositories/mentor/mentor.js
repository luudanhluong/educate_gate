import userTypeModel from "../../models/userTypeModel.js";

const getMentorTypeById = async (userTypeId) => {
  try {
    const userType = await userTypeModel.findById(userTypeId).exec();
    return userType;
  } catch (error) {
    throw new Error("Error finding user type by id");
  }
};

export default { getMentorTypeById };
