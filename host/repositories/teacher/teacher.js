import User from "../../models/userModel.js";

// Hàm này sẽ trả về danh sách học sinh của giáo viên dựa trên teacherId
const getStudentsByTeacherId = async (teacherId) => {
    try {
        const students = await User.find({ teacherId: teacherId });
        return students;
    } catch (error) {
        console.error('Error querying database:', error);
        throw new Error('Internal Server Error');
    }
};

export default {
    getStudentsByTeacherId,
};