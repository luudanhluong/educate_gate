// Import thư viện xlsx để đọc dữ liệu từ Excel
const XLSX = require('xlsx');

// Hàm để đọc dữ liệu từ tệp Excel
function excelParser(filePath) {
    // Đọc tệp Excel
    const workbook = XLSX.readFile(filePath);

    // Lấy danh sách tên của các sheets trong workbook
    const sheetNames = workbook.SheetNames;

    // Chúng ta giả sử dữ liệu nằm trong sheet đầu tiên (sheet 0)
    const firstSheetName = sheetNames[0];

    // Lấy dữ liệu từ sheet đầu tiên
    const worksheet = workbook.Sheets[firstSheetName];

    // Sử dụng hàm xlsx.utils.sheet_to_json để chuyển sheet thành một mảng JSON
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Trả về dữ liệu
    return data;
}

// Sử dụng hàm excelParser để đọc dữ liệu từ tệp Excel
const studentsFromFile = excelParser('./path/to/excelFile.xlsx');

// In ra dữ liệu sinh viên từ tệp Excel
console.log(studentsFromFile);
