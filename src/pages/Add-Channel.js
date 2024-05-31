import React, { useRef, useState } from "react";
import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Channel = () => {
  const [formData, setFormData] = useState({
    label: "",
    form: "",
    url: "",
    
    authKey: "",
    receiverColor: "Green",
    senderColor: "Blue",
    name: ""
  });

  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
   const [type, setType] = useState("Viber"); // State to manage the selected type

  const validate = () => {
    const errors = {};
    if (!formData.label) errors.label = "Label is required";
    if (!formData.form) errors.form = "Form is required";
    if (!formData.url) {
      errors.url = "URL is required";
    } 
    
    if (!formData.authKey) errors.authKey = "Auth Key is required";
    if (!formData.receiverColor) errors.receiverColor = "Receiver Color is required";
    if (!formData.senderColor) errors.senderColor = "Sender Color is required";
    if (!formData.name) errors.name = "Name is required";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());

    // Construct the payload for the API request
    const payload = {
      lbl: formValues.label,
      id: 1, // Assuming this is a static value
      type: type, // Assuming this is a static value
      formname: formValues.form,
      name: formValues.name,
      crndurl: formValues.url,
      authkey: formValues.authKey,
      recivercolor: formValues.receiverColor,
      sendercolor: formValues.senderColor,
    };

    try {
      const response = await fetch('http://135.181.146.84:8001/add-channel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhaWRsYXllcjc4NzgiLCJlbWFpbCI6InJhaWRsYXllckBnbWFpbC5jb20iLCJpYXQiOjE3MTcwNjI3MTcsImV4cCI6MTcxNzA2NjMxN30.rmVr_pmurfgfB28r99WFkC35TCnwPsKuwvy8WNonzaA',
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        // Display success message
        toast.success('Channel added successfully!');
        // Reset the form after successful submission
        formRef.current.reset();
        setFormData({
          label: "",
          form: "",
          url: "",
          authKey: "",
          receiverColor: "",
          senderColor: "",
          name: ""
        });
        setErrors({});
      } else {
        // Display error message from the response
        toast.error(result.message || 'Failed to add channel');
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'An unexpected error occurred');
    }
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
}
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
                  <h2>Add Channel</h2>
                </div>
                <div className="body">
                  <form ref={formRef} id="basic-form" method="post" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                      <h6>Label:</h6>
                      <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="label"
                          value={formData.label}
                          onChange={handleChange}
                          placeholder="Enter Your Label"
                        />
                      </label>
                    </div>
                    </div>
                    {errors.label && <div className="error">{errors.label}</div>}
                    <div className="form-group">
                    <h6>Type:</h6>
                    <div className="form-group c_form_group">
                     
                      <select
                        className="form-control"
                        value={type}
                        onChange={handleTypeChange}
                      >
                        <option value="Viber">Viber</option>
                        <option value="User">User</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>
                    </div>

                    <div className="form-group">
                      <label>Type: <span>Viber</span></label>
                    </div>
                    <div className="form-group">
                      <h6>From:</h6>
                      <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="form"
                          value={formData.form}
                          onChange={handleChange}
                          placeholder="Enter Your From"
                        />
                      </label>
                    </div>
                    </div>
                    {errors.form && <div className="error">{errors.form}</div>}
                    <div className="form-group">
                      <h6>URL:</h6>
                      <div className="form-group c_form_group">
                      <label>
                        <input
                          type="url"
                          className="form-control"
                          name="url"
                          value={formData.url}
                          onChange={handleChange}
                          placeholder="Enter Your URL"
                        />
                      </label>
                    </div>
                    </div>
                    {errors.url && <div className="error">{errors.url}</div>}
                    <div className="form-group">
                      <h6>Auth-Key:</h6>
                      <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="authKey"
                          value={formData.authKey}
                          onChange={handleChange}
                          placeholder="Enter Your Auth-Key"
                        />
                      </label>
                    </div>
                    </div>
                    {errors.authKey && <div className="error">{errors.authKey}</div>}
                    <div className="form-group">
                      <h6>Receiver-Color:</h6>
                      <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="receiverColor"
                          value={formData.receiverColor}
                          onChange={handleChange}
                          placeholder="Enter Your Receiver-Color"
                        />
                      </label>
                    </div>
                    </div>
                    {errors.receiverColor && <div className="error">{errors.receiverColor}</div>}
                    <div className="form-group">
                      <h6>Sender-Color:</h6>
                      <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="senderColor"
                          value={formData.senderColor}
                          onChange={handleChange}
                          placeholder="Enter Your Sender-Color"
                        />
                      </label>
                    </div>
                    </div>
                    {errors.senderColor && <div className="error">{errors.senderColor}</div>}
                    <div className="form-group">
                      <h6>Name:</h6>
                      <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter Your Name"
                        />
                      </label>
                    </div>
                    </div>
                    {errors.name && <div className="error">{errors.name}</div>}
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
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Channel;
