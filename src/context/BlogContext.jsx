import React, { createContext, useState, useEffect } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const addPost = (title, content, tags) => {
    const newPost = {
      title,
      content,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    const newPosts = [...posts, newPost];
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  const updatePost = (index, title, content, tags) => {
    const updatedPosts = posts.map((post, i) =>
      i === index
        ? { ...post, title, content, tags, updatedAt: new Date().toISOString() }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const deletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
        currentPost,
        setCurrentPost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => React.useContext(BlogContext);
