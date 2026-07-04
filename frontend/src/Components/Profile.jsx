import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/exam/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  const Logout = () => {
   toast.success("Logout Successfully");

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <>
      <h1 style={{ fontSize: "50px", color: "blueviolet" }}>
        User Dashboard Details
      </h1>

      {user ? (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "400px",
            borderRadius: "10px",
          }}
        >
          <img
            src={user.profileimage}
            alt={user.username}
            width="150"
            height="150"
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <h2>Name: {user.username}</h2>
          <h3>Email: {user.email}</h3>
          

          <button
            onClick={Logout}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default Profile;