import express from 'express';
import teacherController from '../../controllers/teacherController/teacherController';

const teacherListStudent = express.Router();

teacherListStudent.post("/list_student",teacherController.teacherShowListStudent)

export default teacherListStudent