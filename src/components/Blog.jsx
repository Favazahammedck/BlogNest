import React from "react";
import { useNavigate } from "react-router-dom";
import { BlogProvider } from "../context/BlogContext";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import ModalNotification from "./ModalNotification";
import Swal from "sweetalert2";

const Blog = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Display SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        window.location.reload();
      }
    });
  };

  return (
    <BlogProvider>
      <div
        style={{
          background:
            "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
          minHeight: "100vh",
          padding: "2rem",
          fontFamily: "sans-serif",
        }}
      >
        <div className="flex justify-between mb-2">
          <h1 className="text-3xl text-gray-800">BlogNest</h1>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
        <BlogForm />
        <div className="flex justify-center items-center">
          <BlogList />
        </div>
        <ModalNotification />
      </div>
    </BlogProvider>
  );
};

export default Blog;
