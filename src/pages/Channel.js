import React from "react";
import Layout from "../components/Layout";
import channelService from "./services/channelService";

const ViewChennel = () => {
  const navigate = useNavigate(); // Create a useNavigate instance

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());

    // Construct the payload for the API request
    const payload = {
      lbl: formValues.label,
      id: 1, // Assuming this is a static value
      type: type, // Using the selected type from state
      formname: formValues.form,
      name: formValues.name,
      crndurl: formValues.url,
      authkey: formValues.authKey,
      recivercolor: formValues.recivercolor,
      sendercolor: formValues.sendercolor,
    };

    try {
     
     const response = await channelService.addChannel(JSON.stringify(payload));

      const result = await response.json();
      console.log(result);

      // Reset the form after successful submission
      formRef.current.reset();

      // Handle the response as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid">
          {/* Page header section */}
          <div className="block-header">
            <div className="row clearfix mb-2">
              <div className="col-lg-4 col-md-12 col-sm-12">
                
              </div>
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
                    <h6>Type:</h6>
                    <div className="form-group c_form_group">
                     
                      <select
                        className="form-control"
                        value={type}
                        onChange={handleTypeChange}
                      >
                        <option value="Viber">Viber</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>
                    <h6>Form:</h6>
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

export default ViewChennel;
