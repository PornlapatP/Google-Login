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
    const { id_token, access_token } = await getGoogleTokens(code);
    const userInfo = jwt.decode(id_token);

    // Generate JWT
    const token = jwt.sign({ email: userInfo.email, name: userInfo.name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user: userInfo });
  } catch (error) {
    console.error("Error in Google Callback:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

exports.getUserProfile = (req, res) => {
  res.status(200).json({ user: req.user });
};
