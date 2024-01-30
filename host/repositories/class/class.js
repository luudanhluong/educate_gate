import Class from "../../models/classModel.js";

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
    console.log(data);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { createNewListClass };
