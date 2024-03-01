const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const data = fs.readFileSync(req.file.path, 'utf-8').split('\n').filter(Boolean);
        const students = data.map(name => ({ name }));

        // Lưu dữ liệu vào cơ sở dữ liệu
        await Student.insertMany(students);

        res.send('Tệp đã được tải lên và dữ liệu đã được lưu vào cơ sở dữ liệu thành công.');
    } catch (error) {
        console.error('Đã xảy ra lỗi khi xử lý dữ liệu:', error);
        res.status(500).send('Đã xảy ra lỗi khi xử lý dữ liệu.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
