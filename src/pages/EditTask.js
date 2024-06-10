import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import taskService from "./services/taskService";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditTask = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    label: "",
    name: "",
    note: "",
    status: "",
    crttmstmp: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        setLoading(true);
        const response = await taskService.getTask({
          searchquery: {
            _id: "raidlayer",
            "task.id": _id,
          },
          projection: {
            task: 1,
          },
          showcount: 1,
        });
        
        const task = response.data.data[0].task.find((ts) => ts.id === _id);
        if (task) {
          setTaskData({
            name: task.name,
            label: task.label,
            note: task.note,
            status: task.status,
            crttmstmp: task.crttmstmp,
          });
        }
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await taskService.updateTask({
        searchquery: {
          _id: "raidlayer",
          "task.id": _id,
        },
        body: {
          "task.$.name": taskData.name,
          "task.$.label": taskData.label,
          "task.$.note": taskData.note,
          "task.$.status": taskData.status,
          "task.$.crttmstmp": taskData.crttmstmp,
        },
      });
      toast.success("Task updated successfully");
      navigate(`/task`); // Navigate back to the task view page after a successful update
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const back = () => {
    navigate("/channel");
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
                    <h2>Edit Task: {_id}</h2>
                  </div>
                  <div className="body">
                    {loading ? (
                      <div className="loading-container">
                        <ClipLoader color={"#123abc"} loading={loading} size={50} />
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label>Label</label>
                          <input
                            type="text"
                            name="label"
                            className="form-control"
                            value={taskData.label}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={taskData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Note</label>
                          <input
                            type="text"
                            name="note"
                            className="form-control"
                            value={taskData.note}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Status</label>
                          <input
                            type="text"
                            name="status"
                            className="form-control"
                            value={taskData.status}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Created Timestamp</label>
                          <input
                            type="text"
                            name="crttmstmp"
                            className="form-control"
                            value={taskData.crttmstmp}
                            onChange={handleChange}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4 rounded">
                          Save Changes
                        </button>
                        <button type="button" className="btn btn-secondary mt-4 ml-3 rounded" onClick={back}>
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

export default EditTask;
