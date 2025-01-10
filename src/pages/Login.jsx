import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from "react-router-dom";
import BlogIcon from "../assets/images/blog.webp";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) =>
        user.username === formData.username &&
        user.password === formData.password
    );

    if (user) {
      navigate("/author-dashboard"); // Redirect to dashboard or homepage after successful login
    } else {
      setError("Invalid username or password.");
    }
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
                        Login to Your Account
                      </h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p className="mb-4 text-sm text-center">
                        Please enter your details
                      </p>
                      <p>User Name</p>
                      <TEInput
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mb-4 h-[30px]"
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
                            Login
                          </button>
                        </TERipple>
                      </div>
                    </form>
                    <div className="text-center">
                      <p className="text-sm font-semibold">
                        Don’t have an account?{" "}
                        <button
                          className="text-blue-600"
                          onClick={() => navigate("/register")}
                        >
                          Register
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-[#ee7724] via-[#d8363a] via-[#dd3675] to-[#b44593]">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Welcome back!
                    </h4>
                    <p className="text-sm">
                      We’re glad to see you again. Please log in to your account
                      and pick up where you left off.
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

export default Login;
