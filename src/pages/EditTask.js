import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import chatService from "./services/chatService";
import { toast } from "react-toastify";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const retrievedUser = JSON.parse(localStorage.getItem("loginuser"));
  const retrievedId = localStorage.getItem("loginId");
  
  const [loggedInUser, setLoggedInUser] = useState(retrievedUser || {});  
  const [loggedInId, setLoggedInId] = useState(retrievedId || ''); 
  const [taskData, setTaskData] = useState({
    name: "",
    label: "",
    note: "",
    status: "",
    taskOfUser: "",
    crttmstmp: "",
  });

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await chatService.getTask({
        
            "searchquery": { 
            "_id": loggedInId,
            "task._id": id
          },
            "projection":{ 
            "task.$": 1,
            "_id": 0
          },
            "showcount": 1
        
});

        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0 &&
          response.data.data[0].task &&
          response.data.data[0].task.length > 0
        ) {
          const fetchedTask = response.data.data[0].task[0];
          setTaskData({
            name: fetchedTask.name,
            label: fetchedTask.label,
            note: fetchedTask.note,
            status: fetchedTask.status,
            taskOfUser: fetchedTask.taskOfUser,
            crttmstmp: fetchedTask.crttmstmp,
          });
        } else {
          console.error("Task not found");
        }
      } catch (error) {
        console.error("Error fetching task", error);
      }
    };

    fetchTaskData();
  }, [id]);

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
      await chatService.updateTask({
        "searchquery": { 
            "_id": loggedInId,
            "task._id": id
          },
        body: {
          "task.$.name": taskData.name, // Use $ to target the specific task in the array
          "task.$.label": taskData.label,
          "task.$.note": taskData.note,
          "task.$.status": taskData.status,
          "task.$.taskOfUser": taskData.taskOfUser,
          "task.$.crttmstmp": taskData.crttmstmp,
        },
      });
      toast.success("Task updated successfully");
      navigate("/task")
    } catch (error) {
      console.error("Error updating task", error);
      toast.error("Failed to update task");
    }
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
                  <div className="header"></div>
                  <h2>Update Task:</h2>
                  <div className="body">
                    <form onSubmit={handleSubmit}>
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
                        <label>Task Of User</label>
                        <input
                          type="text"
                          name="taskOfUser"
                          className="form-control"
                          value={taskData.taskOfUser}
                          onChange={handleChange}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary mt-4 rounded">
                        Save Changes
                      </button>
                      <button type="button" className="btn btn-secondary mt-4 ml-3 rounded" onClick={() => navigate("/task")}>
                        Back
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditTask;
