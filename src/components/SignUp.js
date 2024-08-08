import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetch from "node-fetch";
import "./SignUp.css";
import Navbar from "./LandingNavBar";
import { toast } from "react-toastify";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "Sign Up || Learn courses with Happy E-Book";
  }, []);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        userName: "Username is required",
      }));
      setUserName("");
    } else if (value.startsWith(" ")) {
      setErrors((prev) => ({
        ...prev,
        userName: "First character cannot be space",
      }));
    } else if (!/^[A-Za-z0-9_-]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        userName:
          "Username must contain only letters, spaces, hyphen or underscores",
      }));
    } else {
      setUserName(value);
      setErrors((prev) => ({ ...prev, userName: "" }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is required",
      }));
    } else if (value.startsWith(" ")) {
      setErrors((prev) => ({
        ...prev,
        email: "First character cannot be space",
      }));
    } else if (!/^[\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid Email format",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        password: "Password is required",
      }));
    } else if (value.startsWith(" ")) {
      setErrors((prev) => ({
        ...prev,
        password: "First character cannot be space",
      }));
    } else if (value.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleFirstName = (e) => {
    const value = e.target.value;

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        firstName: "First Name is required",
      }));
      setFirstName("");
    } else if (value.startsWith(" ")) {
      setErrors((prev) => ({
        ...prev,
        firstName: "First character cannot be space",
      }));
    } else if (!/^[A-Za-z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        firstName: "First name must contain only alphabets",
      }));
    } else {
      setFirstName(value);
      setErrors((prev) => ({ ...prev, firstName: "" }));
    }
  };

  const handleMiddleName = (e) => {
    const value = e.target.value;

    if (value.startsWith(" ")) {
      setErrors((prev) => ({
        ...prev,
        middleName: "First character cannot be space",
      }));
      setMiddleName("");
    } else if (!/^[A-Za-z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        middleName: "Middle name must contain only alphabets",
      }));
    } else {
      setMiddleName(value);
      setErrors((prev) => ({ ...prev, middleName: "" }));
    }
  };

  const handleLastname = (e) => {
    const value = e.target.value;

    if (value.startsWith(" ")) {
      setErrors((prev) => ({
        ...prev,
        lastName: "First character cannot be space",
      }));
      setLastName("");
    } else if (!/^[A-Za-z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        lastName: "Last name must contain only alphabets",
      }));
    } else {
      setLastName(value);
      setErrors((prev) => ({ ...prev, lastName: "" }));
    }
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRole(value);

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        role: "Role is required",
      }));
    } else {
      setErrors((prev) => ({ ...prev, role: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/user/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        userName,
        password,
        firstName,
        middleName,
        lastName,
        role,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("User created successfully");

          navigate("/login");
        } else if (response && response.status === 409) {
          toast.error("User already exist with this username.");
        } else {
          toast.error("Invalid input fields");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="signup-page">
        <div className="signup-container">
          <div className="form-box">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <label>Username* </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                minLength={3}
                value={userName}
                onChange={handleUsernameChange}
                required
              />
              {errors.userName && <span>{errors.userName}</span>}
              <label>Email* </label>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
              {errors.email && <span>{errors.email}</span>}
              <label>Password* </label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter your password"
                onChange={handlePasswordChange}
                required
              />
              {errors.password && <span>{errors.password}</span>}
              <label>First name* </label>
              <input
                type="text"
                value={firstName}
                placeholder="Enter first name"
                onChange={handleFirstName}
                required
              />
              {errors.firstName && <span>{errors.firstName}</span>}

              <label>Middle name </label>
              <input
                type="text"
                value={middleName}
                placeholder="Enter middle name"
                onChange={handleMiddleName}
              />
              {errors.middleName && <span>{errors.middleName}</span>}
              <label>Last name </label>
              <input
                type="text"
                value={lastName}
                placeholder="Enter last name"
                onChange={handleLastname}
              />
              {errors.lastName && <span>{errors.lastName}</span>}

              <label htmlFor="role">Select Role* </label>
              <select id="role" onChange={handleRoleChange} required>
                <option value="">Select...</option>
                <option value="STUDENT">STUDENT</option>
                <option value="ADMIN">ADMIN</option>
                <option value="AUTHOR">AUTHOR</option>
              </select>
              {errors.role && <span>{errors.role}</span>}
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
