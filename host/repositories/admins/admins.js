import Category from "../../models/categoryModel.js";
import Class from "../../models/classModel.js";
import User from "../../models/userModel.js";
// import UserType from "../../models/userTypeModel.js";
import shuffleArray from "../../utilities/shuffleArray.js";

const getUsers = async ({ item, order, skip, limit, role, search }) => {
  try {
    let query = {};
    if (search && search.length > 0) {
      query.email = { $regex: new RegExp(search, "i") };
    }
    if (role && role > 0) {
      query.role = role;
    }
    const listUsers = await User.find(query, "-password")
      .sort({ [item]: order })
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await User.countDocuments(query).exec();
    return { data: listUsers, total, skip, limit };
  } catch (e) {
    throw new Error(e.message.toString());
  }
};
const createListUsers = async (listData) => {
  try {
    const user = await User.insertMany(listData);
    return user._doc;
  } catch (e) {
    throw new Error(e.message.toString());
  }
};
const createNewListClasses = async (listData) => {
  try {
    const andConditions = listData.map((item) => ({
      $and: [
        { preName: item.preName },
        { code: item.code },
        { suffName: item.suffName },
        { limtStudent: item.limtStudent },
      ],
    }));

    const classList = await Class.find({ $or: andConditions });
    if (classList.length === 0) {
      const result = await Class.insertMany(listData);
      return result._doc;
    }
    return {
      data: classList,
      message: "Lớp đã tồn tại trong hệ thống",
    };
  } catch (e) {
    throw new Error(e.message.toString());
  }
};
const createNewClass = async (data) => {
  try {
    const result = await Class.create(data);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteUserById = async (userId) => {
  try {
    const result = await User.findByIdAndDelete(userId);
    if (result) return "Xóa thành công";
  } catch (error) {
    throw new Error(error.message);
  }
};
const getClasses = async ({ item, order, limit, skip, preName, search }) => {
  try {
    let query = {};
    if (search && search.length > 0) {
      query["teacher.email"] = { $regex: search };
    }
    if (preName && preName.length > 0) {
      query.preName = preName;
    }
    const result = await Class.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "teacherId",
          foreignField: "_id",
          as: "teacher",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "classId",
          as: "users",
        },
      },
      {
        $addFields: {
          userCount: { $size: "$users" },
          teacher: "$teacher",
        },
      },
      {
        $project: {
          users: 0,
          teacherId: 0,
        },
      },
      {
        $match: query,
      },
    ])
      .sort({ [item]: order })
      .skip(skip)
      .limit(limit);
    const total = await Class.countDocuments(query).exec();
    return { data: result, total, skip, limit };
  } catch (error) {
    throw new Error(error.message);
  }
};
const addStudentInClasses = async () => {
  try {
    const studentsRole = 4;
    const users = await User.find({
      $or: [{ classId: { $exists: false } }, { classId: { $eq: null } }],
      role: studentsRole,
    });
    const classes = await Class.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "classId",
          as: "students",
        },
      },
      {
        $addFields: {
          students: { $size: "$students" },
        },
      },
      {
        $match: {
          $expr: { $lt: ["$students", "$limitStudent"] },
        },
      },
    ]);
    for (const cls of classes) {
      const { _id: classId, limitStudent, students } = cls;
      for (let i = 0; i < limitStudent - students; i++) {
        if (users.length === 0) {
          break;
        }
        const user = users.shift();
        await User.updateOne({ _id: user._id }, { $set: { classId: classId } });
      }

      if (users.length === 0) {
        break;
      }
    }
    return "Thêm thành công";
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteClassEmpty = async () => {
  try {
    const classIdEmpty = await Class.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "classId",
          as: "users",
        },
      },
      {
        $addFields: {
          userCount: { $size: "$users" },
        },
      },
      {
        $match: {
          userCount: 0,
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]).exec();
    const result = await Class.deleteMany({ _id: { $in: classIdEmpty } });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
const addTeacherInClass = async () => {
  try {
    const teacherRole = 2;
    const teacher = await User.find({ role: teacherRole });
    const classes = await Class.find({
      $or: [{ teacherId: { $exists: false } }, { teacherId: { $eq: null } }],
    });
    shuffleArray(teacher);
    shuffleArray(classes);
    classes.map(
      async (c, index) =>
        await Class.findByIdAndUpdate(c._id, {
          $set: { teacherId: teacher[index]?._id },
        })
    );

    return "Thêm thành công";
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllCategories = async () => {
  try {
    const result = await Category.find({}).sort({ createdAt: -1 }).exec();
    return { data: result };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCategory = async (id, values) => {
  try {
    return await Category.findByIdAndUpdate(id, values).exec();
  } catch (error) {
    throw new Error(error.message);
  }
};
const addNewCategory = async (name) => {
  try {
    return await Category.create({ name });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCategory = async (id) => {
  try {
    return await Category.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getUsers,
  createListUsers,
  getClasses,
  createNewClass,
  addStudentInClasses,
  deleteClassEmpty,
  addTeacherInClass,
  createNewListClasses,
  getAllCategories,
  updateCategory,
  addNewCategory,
  deleteCategory,
  deleteUserById,
};
