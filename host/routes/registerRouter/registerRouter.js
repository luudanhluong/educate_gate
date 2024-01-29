import express from 'express';
import registerController from '../../controllers/registerController/index.js';

const userRegister = express.Router();

userRegister.post('/', registerController.addNewUser);

export default userRegister;