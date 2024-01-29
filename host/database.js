import mongoose from "mongoose";
import Mentor from "./models/mentorModel.js";
import Teacher from "./models/teacherModel.js";
import Student from "./models/studentModel.js";

// Method connect to database
const connectDB = () => {
    try {
        const db = mongoose.connect(process.env.URI_MONGODB);
        console.log("Connected to MongoDB successfully");
        // Mentor.createIndexes({ email: 1 }, { unique: true });
        // Student.createIndexes({ email: 1 }, { unique: true });
        // Teacher.createIndexes({ email: 1 }, { unique: true });
        return db;
    } catch (errors) {
        console.log(errors.toString());
    }
}
export default connectDB;