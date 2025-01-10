import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useBlogContext } from "../context/BlogContext";
import Swal from "sweetalert2";

const BlogForm = () => {
  const { currentPost, setCurrentPost, addPost, updatePost, posts } =
    useBlogContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    if (currentPost !== null) {
      const postToEdit = posts[currentPost];
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setTags(postToEdit.tags || []);
    }
  }, [currentPost, posts]);

  const handleTagAddition = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentPost !== null) {
      updatePost(currentPost, title, content, tags);
      Swal.fire({
        icon: "success",
        title: "Blog Updated Successfully",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      addPost(title, content, tags); // Adds a new post to the context state
      Swal.fire({
        icon: "success",
        title: "Blog Added Successfully",
        showConfirmButton: false,
        timer: 3000,
      });
    }

    setTitle("");
    setContent("");
    setTags([]);
    setCurrentPost(null);
  };

  return (
    <div className="flex justify-center items-start flex-wrap gap-8 mb-10">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ref={formRef}
        className="bg-white p-5 rounded shadow-md w-full max-w-2xl flex flex-col"
      >
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 mb-2 text-lg border border-gray-300 rounded"
        />
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={handleTagAddition}
            className="bg-gradient-to-r from-[#ee7724] via-[#d8363a] via-[#dd3675] to-[#b44593] text-white p-2 rounded"
          >
            Add Tag
          </button>
        </div>

        <ReactQuill
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline", "strike"],
              [{ align: [] }],
              ["link", "image"],
              [{ color: [] }, { background: [] }],
              ["blockquote", "code-block"],
            ],
          }}
          className="h-48 mb-5"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white border-none p-2 rounded cursor-pointer text-lg mt-[80px]"
        >
          {currentPost !== null ? "Update" : "Publish"} Post
        </motion.button>
      </motion.form>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded shadow-md w-full max-w-2xl"
      >
        <div className="bg-gray-100 p-5 rounded shadow-md w-full max-w-2xl flex flex-col items-start">
          <h3 className="text-lg text-gray-800">Live Preview</h3>
          <div className="border border-gray-300 p-4 rounded bg-white w-full min-h-[300px]">
            <h3 className="text-2xl text-gray-800">{title}</h3>
            <div className="mt-5 border border-gray-300 p-4 rounded bg-white min-h-[300px]">
              <div className="preview-content" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 p-1 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogForm;
