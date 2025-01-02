const jwt = require("jsonwebtoken");
const { generateGoogleAuthURL, getGoogleTokens } = require("../utils/googleOAuth");

exports.googleLogin = (req, res) => {
  const authURL = generateGoogleAuthURL();
  res.redirect(authURL);
};

exports.googleCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).json({ message: "No code provided" });

  try {
    // ดึงข้อมูลจาก Google
    const { id_token, access_token } = await getGoogleTokens(code);
    const userInfo = jwt.decode(id_token);

    // สร้าง JWT
    const token = jwt.sign({ email: userInfo.email, name: userInfo.name }, process.env.JWT_SECRET, {
      expiresIn: "1h", // กำหนดเวลาหมดอายุของ token
    });

    // ส่ง token กลับไปยัง frontend
    res.status(200).json({ token, user: userInfo });
  } catch (error) {
    console.error("Error in Google Callback:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

// ตรวจสอบ user profile
exports.getUserProfile = (req, res) => {
  // หาก token ถูกตรวจสอบและยืนยันแล้ว ให้ส่งข้อมูลผู้ใช้กลับ
  if (req.user) {
    return res.status(200).json({ user: req.user });
  }
  return res.status(401).json({ message: "Unauthorized" });
};
