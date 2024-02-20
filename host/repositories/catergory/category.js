import Category from "../../models/categoryModel.js";

const getAllCategories = async () => {
  try {
    const result = await Category.find({}).exec();
    return { data: result };
  } catch (error) {
    throw new Error(e.message.toString());
  }
};

export default { getAllCategories };
