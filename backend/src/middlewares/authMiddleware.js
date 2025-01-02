const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];  // อ่าน token จาก header
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    // ตรวจสอบ token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // เก็บข้อมูล user ใน request
    next();  // ต่อไปให้ไปที่ route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
