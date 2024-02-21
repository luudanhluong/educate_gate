import express from 'express';
import teacherController from '../../controllers/teacherController/teacherController.js';

const router = express.Router();

// Cập nhật để sử dụng hàm mới trong controller
router.get('/classes', teacherController.getClassListByTeacher);

export default router;