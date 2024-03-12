import Matched from "../../models/matchedModel.js";
import TemporaryMatching from "../../models/temporaryMatching.js";

const addMatched = async (groupId, mentorId) => {
  try {
    await TemporaryMatching.deleteOne({ groupId: groupId });
    return await Matched.create({ groupId: groupId, mentorId: mentorId });
  } catch (error) {
    throw new Error(error.message);
  }
};
const addAllMatching = async (teacherId) => {
  try {
    const listMatched = await TemporaryMatching.find({ teacherId: teacherId });
    await TemporaryMatching.deleteMany({ teacherId: teacherId });
    return await Matched.insertMany(listMatched);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { addMatched, addAllMatching };
