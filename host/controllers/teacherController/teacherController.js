import Class from "../../models/classModel.js";

const getClassListByTeacher = async (req, res) => {
  try {
    // Lấy teacherId từ req.query hoặc req.params, tùy thuộc vào cách bạn thiết kế API
    // Ví dụ: sử dụng req.query.teacherId
    const teacherId = req.query.teacherId.trim();

    // Truy vấn các lớp dựa trên teacherId
    const classes = await Class.find({ teacherId: teacherId }).populate('teacherId');
    res.json(classes);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export default {
  getClassListByTeacher,
};