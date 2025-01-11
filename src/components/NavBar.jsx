import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import Logo from "../assets/images/logo.webp";
import { useBlogContext } from "../context/BlogContext";

export default function NavBar({ setSearchQuery, setSortOrder, setCategory }) {
  const [openNav, setOpenNav] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("title");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { posts } = useBlogContext();

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    const texts = ["title...", "categories...", "tags..."];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setPlaceholderText(texts[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Extract unique categories from posts
    if (posts && posts.length) {
      const uniqueCategories = [...new Set(posts.map(post => post.category))];
      setCategories(uniqueCategories);
    }
  }, [posts]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setCategory(category); // Update the category for filtering blogs
  };

  return (
    <nav className="mx-full px-4 py-2 lg:px-8 lg:py-4 bg-white shadow">
      <div className="flex items-center justify-between text-blue-gray-900">
        <a href="/" className="mr-4 cursor-pointer py-1.5 font-medium">
          <img className="h-[60px] w-[130px]" src={Logo} />
        </a>

        <div className="hidden lg:block">
          <div className="relative flex w-full gap-2 md:w-max">
            <input
              type="search"
              placeholder={`Search by ${placeholderText}`}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-20 py-2 px-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent min-w-[288px]"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bg-white-500 text-gray py-2 px-4 rounded-md"
            >
              <IoSearchSharp />
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border border-gray-300 px-4 py-2 rounded-md mr-2"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md"
            >
              <option value="latest">Date Published: Latest</option>
              <option value="oldest">Date Published: Oldest</option>
            </select>
          </div>
          <button
            onClick={handleRegister}
            className="bg-gradient-to-r from-[#ee7724] via-[#d8363a] via-[#dd3675] to-[#b44593] text-white px-4 py-2 rounded-sm"
          >
            Register/Login As Blog Author
          </button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpenNav(!openNav)}>
          {openNav ? (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>
      {openNav && (
        <div className="lg:hidden">
          <div className="relative flex w-full gap-2">
            <input
              type="search"
              placeholder={`Search by ${placeholderText}`}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-20 py-2 px-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent min-w-[288px]"
            />
            <button className="absolute right-1 top-1 bg-white-500 text-gray py-2 px-4 rounded-md">
              <IoSearchSharp />
            </button>
          </div>
          <div className="mt-4 flex flex-col items-start gap-2">
          <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="latest">Date Published: Latest</option>
              <option value="oldest">Date Published: Oldest</option>
            </select>
            <button
              onClick={handleRegister}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-sm w-full"
            >
              Register/Login As Blog Author
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
