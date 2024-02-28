const fs = require('fs');

// Hàm để đọc dữ liệu từ tệp
function readDataFromFile(filePath) {
    try {
        // Đọc nội dung của tệp
        const data = fs.readFileSync(filePath, 'utf8');
        // Trả về dữ liệu dưới dạng mảng các dòng
        return data.trim().split('\n');
    } catch (error) {
        console.error('Đã xảy ra lỗi khi đọc tệp:', error.message);
        return [];
    }
}

// Ví dụ sử dụng hàm để đọc dữ liệu từ tệp và hiển thị ra console
const filePath = './path/to/your/file.txt'; // Đường dẫn tới tệp
const dataFromFile = readDataFromFile(filePath);
console.log(dataFromFile);
