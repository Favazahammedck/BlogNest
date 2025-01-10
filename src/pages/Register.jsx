import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from "react-router-dom";
import BlogIcon from "../assets/images/blog.webp";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    // Check if the username already exists
    if (existingUsers.some((user) => user.username === formData.username)) {
      setError("Username already exists.");
      return;
    }

    // Save the new user to localStorage
    localStorage.setItem("users", JSON.stringify([...existingUsers, formData]));

    navigate("/login");
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700 flex justify-center">
      <div className="container h-[100%] p-5">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img className="mx-auto w-48" src={BlogIcon} alt="logo" />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        Register a New Account
                      </h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p className="mb-4 text-sm text-center">
                        Please fill in the details
                      </p>
                      <p>User Name</p>
                      <TEInput
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mb-4"
                      />
                      <p>Password</p>
                      <TEInput
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mb-4"
                      />
                      {error && <p className="text-red-500">{error}</p>}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white bg-gradient-to-r from-[#ee7724] via-[#d8363a] via-[#dd3675] to-[#b44593]"
                            type="submit"
                          >
                            Register
                          </button>
                        </TERipple>
                      </div>
                    </form>
                    <div className="text-center">
                      <p className="text-sm font-semibold">
                        Already have an account?{" "}
                        <button
                          className="text-blue-600"
                          onClick={() => navigate("/login")}
                        >
                          Login
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-[#ee7724] via-[#d8363a] via-[#dd3675] to-[#b44593]">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Join Our Blog Community!
                    </h4>
                    <p className="text-sm">
                      Welcome to the platform where your ideas and stories come
                      to life. Register now and become a part of an exciting
                      space to express your thoughts, connect with fellow
                      writers, and share your creativity with the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
