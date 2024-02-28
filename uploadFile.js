const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Thiết lập Multer để lưu trữ tệp tải lên trong thư mục 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// Đường dẫn tới trang tải lên tệp
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Xử lý tệp được tải lên
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Tệp đã được tải lên thành công.');
    // Ở đây bạn có thể thêm mã để xử lý tệp đã tải lên, ví dụ: lưu vào cơ sở dữ liệu.
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
