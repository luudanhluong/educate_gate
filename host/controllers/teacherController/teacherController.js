import teacher from "../../repositories/teacher/teacher";

const teacherShowListStudent = async(res,req) => {
    const teacherId = req.params.teacherId;
    try {
        // Sử dụng Mongoose để lấy thông tin học sinh của giáo viên
        const students = await teacherRepository.getStudentsByTeacherId(teacherId);
        res.json(students);
      } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
      }
}
export default{
    teacherShowListStudent
}