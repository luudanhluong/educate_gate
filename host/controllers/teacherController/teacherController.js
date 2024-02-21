import getStudentsByTeacherId from "../../repositories/teacher/teacher";

const teacherShowListStudent = async(req, res) => {
    const teacherId = req.params.teacherId;
    try {
        // Sử dụng Mongoose để lấy thông tin học sinh của giáo viên
        const students = await getStudentsByTeacherId.getStudentsByTeacherId(teacherId);
        res.json(students);
      } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
      }
}
const teacherListClass = async(req, res) =>{
  try {
    // Giả sử giáo viên được xác định bởi ID và mỗi lớp có trường teacherId
    const classes = await ClassModel.find({ teacherId: req.user.id });
    res.json({ success: true, classes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export default{
    teacherShowListStudent,
    teacherListClass,
}