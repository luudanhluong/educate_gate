import temporaryMatching from "../../repositories/temporaryMatching/index.js";

const getAllTempararyMatching = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const { gid } = req.params;
    const { search, skip, limit } = req.query;
    res.status(200).json(
      await temporaryMatching.getAllTempararyMatching(gid, {
        search,
        skip: Number.parseInt(skip),
        limit: Number.parseInt(limit),
      })
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getAllTempararyMatching };
