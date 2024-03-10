import mongoose from "mongoose";
import Class from "../../models/classModel.js";
import Group from "../../models/groupModel.js";
import User from "../../models/userModel.js";
import shuffleArray from "../../utilities/shuffleArray.js";
import Matched from "../../models/matchedModel.js";
import TemporaryMatching from "../../models/temporaryMatching.js";

const getClassByTeacherId = async (teacherId) => {
  try {
    const students = await Class.find({ teacherId: teacherId });
    return students;
  } catch (error) {
    console.error("Error querying database:", error);
    throw new Error("Internal Server Error");
  }
};
const suggestMatching = async (teacherId) => {
  try {
    await TemporaryMatching.deleteMany({ teacherId: teacherId });
    const listGroups = await Class.aggregate([
      { $match: { teacherId: new mongoose.Types.ObjectId(teacherId) } },
      {
        $lookup: {
          from: "groups",
          localField: "_id",
          foreignField: "classId",
          as: "group",
        },
      },
      { $unwind: "$group" },
      {
        $lookup: {
          from: "projects",
          localField: "group.projectId",
          foreignField: "_id",
          as: "project",
        },
      },
      {
        $unwind: "$project",
      },
      {
        $lookup: {
          from: "projectcategories",
          localField: "project._id",
          foreignField: "projectId",
          as: "projectcategories",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "projectcategories.categoryId",
          foreignField: "_id",
          as: "projectcategories",
        },
      },
    ]);
    const listMentors = await User.aggregate([
      { $match: { role: 3 } },
      {
        $lookup: {
          from: "mentorcategories",
          localField: "_id",
          foreignField: "userId",
          as: "mentorcategories",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "mentorcategories.categoryId",
          foreignField: "_id",
          as: "mentorcategories",
        },
      },
      {
        $lookup: {
          from: "matcheds",
          localField: "_id",
          foreignField: "mentorId",
          as: "matcheds",
        },
      },
      {
        $addFields: {
          matcheds: { $size: "$matcheds" },
        },
      },
      {
        $match: {
          $expr: { $lt: ["$matcheds", "$menteeCount"] },
        },
      },
    ]);
    shuffleArray(listGroups);
    shuffleArray(listMentors);
    let temporaryMatching = [];
    for (const g of listGroups) {
      const { projectcategories, group, teacherId } = g;
      for (const m of listMentors) {
        const { mentorcategories, menteeCount, _id: mid } = m;
        const countMatched = await Matched.countDocuments({ mentorId: mid });
        if (countMatched === menteeCount) break;
        const matching = projectcategories.filter((p) =>
          mentorcategories.some((m) => m._id.toString() === p._id.toString())
        );
        const count = temporaryMatching.filter(
          (m) => m.mentorId === mid
        ).length;
        if (matching.length > 0 && count < menteeCount - countMatched) {
          temporaryMatching.push({
            mentorId: mid,
            groupId: group._id,
            teacherId: teacherId,
          });
          break;
        }
      }
    }
    const result = await TemporaryMatching.insertMany(temporaryMatching);
    if (result) return "Đã thêm vào ghép tạm thời";
  } catch (error) {
    console.log(error.message);
  }
};
export default {
  getClassByTeacherId,
  suggestMatching,
};
