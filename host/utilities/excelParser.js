import shuffleArray from './shuffleArray';
import xlsx from 'xlsx';
import mongoose from 'mongoose';

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/groupData', { useNewUrlParser: true, useUnifiedTopology: true });
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

// Hàm để đọc dữ liệu từ file Excel
function readExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Giả sử dữ liệu ở sheet đầu tiên
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  return data;
}

// Hàm để thêm sinh viên vào MongoDB
async function addToDatabase(students) {
  try {
    // Tạo danh sách sinh viên từ dữ liệu Excel
    const studentList = students.map(student => ({ name: student }));

    // Tạo một nhóm mới với danh sách sinh viên
    const newGroup = new Group({
      groupNumber: 0, // Có thể thêm thông tin nhóm tùy theo nhu cầu
      students: studentList
    });

    // Lưu nhóm vào cơ sở dữ liệu
    await newGroup.save();

    console.log("Dữ liệu sinh viên từ file Excel đã được thêm vào cơ sở dữ liệu.");
  } catch (error) {
    console.error("Lỗi khi thêm dữ liệu sinh viên vào cơ sở dữ liệu:", error);
  }
}

// Hàm chính để thêm sinh viên từ file Excel và lưu vào cơ sở dữ liệu
async function processExcelFile(filePath) {
  try {
    // Đọc dữ liệu từ file Excel
    const students = readExcel(filePath);

    // Xáo trộn thứ tự của sinh viên
    shuffleArray(students);

    // Thêm sinh viên vào cơ sở dữ liệu
    await addToDatabase(students);
  } catch (error) {
    console.error("Lỗi khi xử lý file Excel:", error);
  }
}

// Gọi hàm để xử lý file Excel và thêm sinh viên vào cơ sở dữ liệu
const excelFilePath = 'path/to/your/excel/file.xlsx'; // Thay đổi đường dẫn tới file Excel của bạn
processExcelFile(excelFilePath);

