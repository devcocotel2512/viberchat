import React, { useState } from "react";
import Layout from "../components/Layout";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  
    const requestOptions = {
      method: "POST",
      headers: {
        
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhaWRsYXllcjc4NzgiLCJlbWFpbCI6InJhaWRsYXllckBnbWFpbC5jb20iLCJpYXQiOjE3MTcwNjI3MTcsImV4cCI6MTcxNzA2NjMxN30.rmVr_pmurfgfB28r99WFkC35TCnwPsKuwvy8WNonzaA",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formData.name,
        email: formData.email,
        password: formData.password
      })
    };
  
    try {
      const response = await fetch("http://135.181.146.84:8001/add-user", requestOptions);
      console.log("Response Status:", response.status);
      const data = await response.json();
      console.log("Response Data:", data);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Clear form data after successful submission
      setFormData({
        name: "",
        email: "",
        password: ""
      });
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
      // Additional error handling can be added here, such as displaying an error message to the user.
    }
  };

  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid">
          <div className="block-header">
            <div className="row clearfix">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <h1>Hi, Welcomeback!</h1>
                <span>JustDo Form Validation,</span>
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
                    <h5>Name:</h5>
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
                    <h5>Email:</h5>
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
                    <h5>Password:</h5>
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
                    <div className="form-group">
                      <div className="row clearfix"></div>
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary theme-bg gradient"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddUser;
