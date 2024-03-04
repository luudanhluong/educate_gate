import Matched from "../../models/matchedModel.js";
import TemporaryMatching from "../../models/temporaryMatching.js";

const addMatched = async (values) => {
  try {
    await TemporaryMatching.deleteMany({ groupId: values.groupId });
    return await Matched.create(values);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { addMatched };
