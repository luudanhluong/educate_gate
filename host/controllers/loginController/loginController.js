import user from "../../repositories/user/index.js";

const getUserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await user.loginUser({ email, password });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getUserLogin,
}