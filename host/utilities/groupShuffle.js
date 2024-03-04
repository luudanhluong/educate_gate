import shuffleArray from './shuffleArray';
import mongoose from 'mongoose';

// Kết nối đến MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/EXE101', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Mô hình dữ liệu sinh viên
const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String
});
const Student = mongoose.model('Student', studentSchema);

// Mô hình dữ liệu nhóm
const groupSchema = new mongoose.Schema({
  groupNumber: Number,
  students: [studentSchema]
});
const Group = mongoose.model('Group', groupSchema);

// Hàm để chia thành các nhóm dựa trên mảng và số lượng nhóm mong muốn
function divideIntoGroups(array, numberOfGroups) {
  const groups = Array.from({ length: numberOfGroups }, (_, index) => ({
    groupNumber: index + 1,
    students: []
  }));
  let currentGroup = 0;

  array.forEach(item => {
    groups[currentGroup].students.push({ name: item });
    currentGroup = (currentGroup + 1) % numberOfGroups;
  });

  return groups;
}

// Hàm để tạo và lưu nhóm vào MongoDB
async function createAndSaveRandomGroups() {
  try {
    // Xóa dữ liệu cũ nếu có
    await Group.deleteMany({});
    
    // Tạo danh sách sinh viên
    const students = Array.from({ length: 50 }, (_, index) => `Sinh viên ${index + 1}`);
    shuffleArray(students);

    // Chia nhóm sinh viên
    const groups = divideIntoGroups(students, 5);

    // Thêm nhóm vào MongoDB
    await Group.insertMany(groups);

    console.log("Dữ liệu nhóm đã được tạo và lưu vào MongoDB.");
  } catch (error) {
    console.error("Lỗi khi tạo và lưu dữ liệu nhóm:", error);
  }
}

// Gọi hàm để tạo và lưu nhóm vào MongoDB
createAndSaveRandomGroups();


