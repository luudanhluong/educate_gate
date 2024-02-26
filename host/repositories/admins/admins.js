import Class from "../../models/classModel.js";
import User from "../../models/userModel.js";
import UserType from "../../models/userTypeModel.js";
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
    const userRole = await User.distinct("role").exec();
    const userTypes = await UserType.find({
      role: { $in: userRole },
    }).exec();
    const total = await User.countDocuments(query).exec();
    const quantityUsers = await Promise.all(
      userTypes.map(async (type) => {
        return {
          name: type.name,
          qtt: await User.countDocuments({
            role: type.role,
          }),
        };
      })
    );
    return { data: listUsers, total, skip, limit, userTypes, quantityUsers };
  } catch (e) {
    throw new Error(e.message.toString());
  }
};
const createListUsers = async (listData) => {
  try {
    const emailList = listData.map((user) => user.email);
    const userList = await User.find({
      email: { $in: emailList },
    })
      .select("email username")
      .exec();
    if (userList.length === 0) {
      const user = await User.insertMany(listData);
      return user._doc;
    }
    return {
      data: userList,
      message: "Email đã tồn tại trong hệ thống",
    };
  } catch (e) {
    throw new Error(e.message.toString());
  }
};
const createNewListClassesFromFile = async (listData) => {
  try {
    const andConditions = listData.map((item) => ({
      $and: [
        { preName: item.preName },
        { code: item.code },
        { suffName: item.suffName },
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
const getClasses = async ({ item, order, limit, skip, preName, search }) => {
  let query = {};
  if (search && search > 0) {
    query.code = search;
  }
  if (preName && preName.length > 0) {
    query.preName = preName;
  }
  try {
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
      .limit(limit)
      .exec();
    const listPreName = await Class.distinct("preName").exec();
    const total = await Class.countDocuments(query).exec();
    return { data: result, total, skip, limit, listPreName };
  } catch (error) {
    throw new Error(error.message);
  }
};
const addStudentInClasses = async () => {
  try {
    const studentsRole = 4;
    let studentCount = 0;
    let classIndex = 0;
    const bulkUpdateOps = [];
    const targetStudentsPerClass = 28;
    const users = await User.find({
      $or: [{ classId: { $exists: false } }, { classId: { $eq: null } }],
      role: studentsRole,
    });
    const classes = await Class.find({
      $or: [{ status: { $exists: false } }, { status: "empty" }],
    });
    for (const user of users) {
      if (user.role === studentsRole) {
        bulkUpdateOps.push({
          updateOne: {
            filter: { _id: user._id },
            update: { $set: { classId: classes[classIndex]._id } },
          },
        });
        studentCount++;
        if (studentCount === targetStudentsPerClass) {
          classIndex++;
          studentCount = 0;
        }
      }
    }
    if (bulkUpdateOps.length > 0) {
      return await User.bulkWrite(bulkUpdateOps, { ordered: false });
    }
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
    const classWithTeacher = classes.map((c, index) => ({
      updateOne: {
        filter: { _id: c._id },
        update: { $set: { teacherId: teacher[index]._id || null } },
      },
    }));
    const result = await Class.bulkWrite(classWithTeacher);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default {
  getUsers,
  createListUsers,
  getClasses,
  createNewListClass,
  addStudentInClasses,
  deleteClassEmpty,
  addTeacherInClass,
  createNewListClassesFromFile,
};