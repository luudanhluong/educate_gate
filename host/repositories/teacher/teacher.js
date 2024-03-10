import mongoose from "mongoose";
import Class from "../../models/classModel.js";
import Group from "../../models/groupModel.js";
import User from "../../models/userModel.js";

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
    ]);
    let temporaryMatching = [];
    listGroups.forEach((g) => {
      const { projectcategories, group, teacherId } = g;
      listMentors.forEach((m) => {
        const { mentorcategories, menteeCount, _id: mid } = m;
        const matching = mentorcategories.filter((m) =>
          projectcategories.some((p) => m._id === p._id)
        );
        temporaryMatching.push(matching);
      });
    });
    return temporaryMatching;
  } catch (error) {
    console.log(error.message);
  }
};
export default {
  getClassByTeacherId,
  suggestMatching,
};
