// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useBlogContext } from "../context/BlogContext";
// import NavBar from "../components/NavBar";
// const BlogReadingPage = () => {
//   const { posts } = useBlogContext();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOrder, setSortOrder] = useState("latest");

//   const formatTime = (time) => {
//     return new Date(time).toLocaleString();
//   };

//   const filteredPosts = posts
//     .filter(
//       (post) =>
//         post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (post.tags &&
//           post.tags.some((tag) =>
//             tag.toLowerCase().includes(searchQuery.toLowerCase())
//           ))
//     )
//     .sort((a, b) => {
//       if (sortOrder === "latest") {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       } else {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       }
//     });

//   return (
//     <>
//       <NavBar setSearchQuery={setSearchQuery} setSortOrder={setSortOrder} />
//       <div className="p-10">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-[900px] mx-auto p-8 flex flex-col justify-center"
//         >
//           {filteredPosts.length === 0 ? (
//             <div className="text-center text-gray-500 text-xl">
//               No blogs found.
//             </div>
//           ) : (
//             filteredPosts.map((post, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: 100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-white p-5 rounded shadow-md mb-5 blog-img"
//               >
//                   <p className="text-sm text-gray-600 text-end">Category: {post.category}</p>
//                 <h2 className="text-2xl text-gray-800">{post.title}</h2>
//                 <div dangerouslySetInnerHTML={{ __html: post.content }} />
//                 <div className="mt-4 flex gap-2">
//                   {post.tags &&
//                     post.tags.map((tag, idx) => (
//                       <span
//                         key={idx}
//                         className="bg-gray-200 p-1 rounded text-sm"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                 </div>
//                 <p className="text-sm text-gray-600 text-end">
//                   {post.updatedAt
//                     ? `Edited on ${formatTime(post.updatedAt)}`
//                     : `Created on ${formatTime(post.createdAt)}${
//                         !post.updatedAt ? " (New Blog)" : ""
//                       }`}
//                 </p>
//               </motion.div>
//             ))
//           )}
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default BlogReadingPage;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useBlogContext } from "../context/BlogContext";
import NavBar from "../components/NavBar";

const BlogReadingPage = () => {
  const { posts } = useBlogContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState("");

  const formatTime = (time) => {
    return new Date(time).toLocaleString();
  };

  const filteredPosts = posts
    .filter(
      (post) =>
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (post.tags &&
            post.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            ))) &&
        (selectedCategory ? post.category === selectedCategory : true) // Filter by category
    )
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  return (
    <>
      <NavBar
        setSearchQuery={setSearchQuery}
        setSortOrder={setSortOrder}
        setCategory={setSelectedCategory} // Pass setCategory to update selected category
      />
      <div className="p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[900px] mx-auto p-8 flex flex-col justify-center"
        >
          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-500 text-xl">
              No blogs found.
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-5 rounded shadow-md mb-5 blog-img"
              >
                <p className="text-sm text-gray-600 text-end">Category: {post.category}</p>
                <h2 className="text-2xl text-gray-800">{post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <div className="mt-4 flex gap-2">
                  {post.tags &&
                    post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 p-1 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                <p className="text-sm text-gray-600 text-end">
                  {post.updatedAt
                    ? `Edited on ${formatTime(post.updatedAt)}`
                    : `Created on ${formatTime(post.createdAt)}${
                        !post.updatedAt ? " (New Blog)" : ""
                      }`}
                </p>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </>
  );
};

export default BlogReadingPage;
