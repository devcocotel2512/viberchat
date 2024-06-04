import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import authService from "./services/authService"; // Adjust the path as needed
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
  const { userun } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    un: "",
    em: "",
    pass: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await authService.getUser({
          searchquery: {
            _id: "raidlayer",
            "user.un": userun,
          },
          projection: {
            "user.$": 1,
          },
        });

        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0 &&
          response.data.data[0].user &&
          response.data.data[0].user.length > 0
        ) {
          const fetchedUser = response.data.data[0].user[0];
          setUserData({
            un: fetchedUser.un,
            em: fetchedUser.em,
            pass: fetchedUser.pass,
          });
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userun]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      await authService.updateUser({
        searchquery: {
                  _id: "raidlayer",
                  "user.un": userun,
                },
                body: {
                          "user.$.un": userData.un,
                          "user.$.em": userData.em,
                          "user.$.pass": userData.pass,
                        },
      })
      toast.success("User Update Successfully");
    }catch(error){
      console.error("Error Updating USer:", error);
      toast.error("Failed to Upadte User");
    }finally{
      setLoading(false);
    }
  }

  const back = () => {
    navigate('/user');
  };

  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid">
          <div className="block-header">
            <div className="row clearfix mb-2">
              <div className="col-xl-5 col-md-5 col-sm-12"></div>
              <div className="col-xl-7 col-md-7 col-sm-12 text-md-right hidden-xs"></div>
            </div>
            <div className="row clearfix">
              <div className="col-md-12">
                <div className="card">
                  <div className="header">
                    <h2>Edit User: {userun}</h2>
                  </div>
                  <div className="body">
                    {loading ? (
                      <div className="loading-container">
                        <ClipLoader color={"#123abc"} loading={loading} size={50} />
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label>Username</label>
                          <input
                            type="text"
                            name="un"
                            className="form-control"
                            value={userData.un}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            name="em"
                            className="form-control"
                            value={userData.em}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            name="pass"
                            className="form-control"
                            value={userData.pass}
                            onChange={handleChange}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4 rounded">
                          Save Changes
                        </button>
                        <button type="button" className="btn btn-class mt-4 ml-3 rounded" onClick={back}>
                          Back
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </Layout>
  );
};

export default EditUser;
