// import { useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";

// interface User {
//   name: string;
//   email: string;
// }

// const Profile = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("No token found. Please log in.");
//           setLoading(false);
//           return;
//         }

//         const response = await axiosInstance.get<{ user: User }>("/profile");
//         setUser(response.data.user);
//       } catch (err: unknown) {
//         console.error("Error fetching profile:", err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   if (!user) {
//     return <div>No user data available.</div>;
//   }

//   return (
//     <div>
//       <h1>Profile</h1>
//       <p>
//         <strong>Name:</strong> {user.name}
//       </p>
//       <p>
//         <strong>Email:</strong> {user.email}
//       </p>
//     </div>
//   );
// };

// export default Profile;
