const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.params.userId = decoded.userId;

    if (decoded) {
      next();
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      err: error,
    });
    throw error;
  }
};

module.exports = {
  authMiddleware,
};
