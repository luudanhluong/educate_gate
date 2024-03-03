import TemporaryMatching from "../../models/temporaryMatching.js";
import mongoose from "mongoose";

const getAllTempararyMatching = async (gId, { search, skip, limit }) => {
  try {
    let query = { groupId: new mongoose.Types.ObjectId(gId) };
    if (search && search.length > 0) {
      query["mentorId.email"] = { $regex: search, $options: "i" };
    }
    let pipeline = [
      {
        $match: { groupId: new mongoose.Types.ObjectId(gId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "mentorId",
          foreignField: "_id",
          as: "mentorId",
        },
      },
      { $match: query },
    ];
    const result = await TemporaryMatching.aggregate(pipeline)
      .skip(skip)
      .limit(limit);
    const count = await TemporaryMatching.countDocuments({ groupId: gId });
    return { data: result, count, limit, skip };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getAllTempararyMatching,
};
