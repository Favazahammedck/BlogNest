import React from "react";
import { motion } from "framer-motion";
import { useBlogContext } from "../context/BlogContext";
import Swal from "sweetalert2";

const BlogList = () => {
  const { posts, setCurrentPost, deletePost } = useBlogContext();

  const handleEdit = (index) => {
    setCurrentPost(index);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this blog post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(index);
      }
    });
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl"
    >
      {posts.map((post, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-5 rounded shadow-md mb-5"
        >
          <h2 className="text-2xl text-gray-800">{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <p className="text-sm text-gray-600 text-end">
            {post.updatedAt
              ? `Edited on ${formatTime(post.updatedAt)}`
              : `Created on ${formatTime(post.createdAt)}${
                  !post.updatedAt ? " (New Blog)" : ""
                }`}
          </p>
          <hr />
          <button
            onClick={() => handleEdit(index)}
            className="bg-green-500 text-white border-none p-2 mt-3 rounded cursor-pointer text-lg mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(index)}
            className="bg-red-500 text-white border-none p-2 rounded cursor-pointer text-lg"
          >
            Delete
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BlogList;
