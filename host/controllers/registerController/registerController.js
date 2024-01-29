import mongoose from "mongoose";
import user from "../../repositories/user/index.js";
import bcrypt from "bcrypt"; 

const addNewUser = async (req, res, next) => {
    try {
        const { username, password, email, role } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await user.createNewUser({ username, email, password: hashedPassword, role });
        res.status(201).json(result);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

export default {
    addNewUser,
}