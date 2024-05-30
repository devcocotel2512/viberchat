import React from "react";
import Layout from "../components/Layout";

const Chennel = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());

    // Construct the payload for the API request
    const payload = {
      lbl: formValues.label,
      id: 1, // Assuming this is a static value
      type: "vi", // Assuming this is a static value
      frm: formValues.form,
      nm: formValues.name,
      crndurl: formValues.url,
      authkey: formValues.authKey
    };

    try {
      const response = await fetch('http://135.181.146.84:8001/add-channel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaWRsYXllciIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzE2OTYzNTE3LCJleHAiOjE3MTY5NjcxMTd9.aSVO6-oZY_X9Sru6MYfiP6BR51MiBVzDThP-xWafsZU'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log(result);

      // Handle the response as needed
    } catch (error) {
      console.error('Error:', error);
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
                  <h2>Add Chennel</h2>
                </div>
                <div className="body">
                  <form id="basic-form" method="post" onSubmit={handleSubmit} noValidate>
                    <h6>Label:</h6>
                    <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="label"
                          required
                          placeholder="Enter Your Label"
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Type: <span>Viber</span>
                      </label>
                    </div>
                    <h6>Form</h6>
                    <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="form"
                          required
                          placeholder="Enter Your Form"
                        />
                      </label>
                    </div>

                    <h6>URL:</h6>
                    <div className="form-group c_form_group">
                      <label>
                        <input
                          type="url"
                          className="form-control"
                          name="url"
                          required
                          placeholder="Enter Your Url"
                        />
                      </label>
                    </div>

                    <h6>App-Key:</h6>
                    <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="appKey"
                          required
                          placeholder="Enter Your App-Key"
                        />
                      </label>
                    </div>

                    <h6>Auth-Key:</h6>
                    <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="authKey"
                          required
                          placeholder="Enter Your Auth-Key"
                        />
                      </label>
                    </div>

                    <h6>Receiver-Color:</h6>
                    <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="receiverColor"
                          required
                          placeholder="Enter Your Receiver-Color"
                        />
                      </label>
                    </div>

                    <h6>Sender-Color:</h6>
                    <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="senderColor"
                          required
                          placeholder="Enter Your Sender-Color"
                        />
                      </label>
                    </div>

                    <h6>Name:</h6>
                    <div className="form-group c_form_group">
                      <label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          required
                          placeholder="Enter Your Name"
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
                      Validate
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

export default Chennel;
