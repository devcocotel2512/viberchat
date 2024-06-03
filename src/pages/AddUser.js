import React, { useState } from "react";
import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import authService from "./services/authService";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verified:""
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    } else if (formData.name.length > 15) {
      errors.name = "Name must be 15 characters or less";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Form Data:", formData);


    const payload = {
      username: formData.name,
      email: formData.email,
      password: formData.password
    };
    try {
      const response = await authService.addUser(payload);


      if (!response.data.status) {
        throw new Error(response.data.message || `HTTP error! status: ${response.data.status}`);
      }

      // Clear form data after successful submission
      setFormData({
        name: "",
        email: "",
        password: ""
      });
      toast.success("User added successfully!");
      setServerError(""); // Clear any previous server errors
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
      toast.error(error.message);
      // setServerError(error.message); // Set the server error message
    }
  };

  const back = () => {
    navigate('/user')
  }

  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid">
          <div className="block-header">
            <div className="row clearfix">
              <div className="col-lg-4 col-md-12 col-sm-12">
               
              </div>
              <div className="col-lg-8 col-md-12 col-sm-12 text-lg-right"></div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-md-12">
              <div className="card">
                <div className="header">
                  <h2>Add User</h2>
                </div>
                <div className="body">
                  <form id="basic-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                      <h6>Name:</h6>
                      <div className="form-group c_form_group">
                        <label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            required
                            placeholder="Enter Your Name"
                            value={formData.name}
                            onChange={handleChange}
                          />

                        </label>
                      </div>
                      {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                      <h6>Email:</h6>
                      <div className="form-group c_form_group">
                        <label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            required
                            placeholder="Enter Your Email"
                            value={formData.email}
                            onChange={handleChange}
                          />

                        </label>
                      </div>
                      {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                      <h6>Password:</h6>
                      <div className="form-group c_form_group">
                        <label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            required
                            placeholder="Enter Your Password"
                            value={formData.password}
                            onChange={handleChange}
                          />

                        </label>
                      </div>
                      {errors.password && <div className="error">{errors.password}</div>}
                    </div>

                    <div className="form-group">
                      <div className="row clearfix"></div>
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary rounded"
                    >
                      Submit
                    </button>
                    <button type="submit" className="btn btn-class  ml-3 rounded" onClick={back}>
                        Back
                        </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default AddUser;
