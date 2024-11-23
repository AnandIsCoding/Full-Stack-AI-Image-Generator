import jwt from "jsonwebtoken";

const getId = (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies); // Debugging log

    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication token missing. Please log in." });
    }

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY); // Decode token
    req.body.userId = decoded._id; // Attach userId to request body
    next();
  } catch (error) {
    console.error("Error in getId middleware:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token. Please log in again." });
  }
};

export default getId;
