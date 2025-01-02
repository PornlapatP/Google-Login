import { useEffect } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    const name = query.get("name") || "Unknown User"; // ตั้งค่าเริ่มต้น
    const email = query.get("email") || "unknown@example.com"; // ตั้งค่าเริ่มต้น

    if (token) {
      // ตรวจสอบค่า token ก่อนบันทึก
      localStorage.setItem("token", token);
      localStorage.setItem("name", name); // name จะไม่เป็น null เพราะตั้งค่าเริ่มต้น
      localStorage.setItem("email", email); // email จะไม่เป็น null เพราะตั้งค่าเริ่มต้น
      window.history.replaceState(null, "", "/"); // ลบ Query Parameters
    }
  }, []);

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/google`;
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Welcome to Google OAuth App</h1>
        <button
          onClick={handleLogin}
          style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
        >
          Login with Google
        </button>
      </div>
    </>
  );
};

export default Home;
