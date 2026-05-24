import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        formData
      );

      alert("User registered successfully");

      navigate("/");

    } catch (error) {

      alert("Registration failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
          Register
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-6"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6">

          Already have an account?

          <Link
            to="/"
            className="text-purple-600 font-bold ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;