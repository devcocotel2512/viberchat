import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import chatService from "./services/chatService";
import { toast } from "react-toastify";

const EditTask = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
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
          searchQuery: {
            _id: "raidlayer",
            "task_id": _id,
          },
          projection: {
            task: 1,
          },
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
      await chatService.updateTask({
        searchquery: {
          _id: "raidlayer",
          "task_id": _id,
        },
        body: {
          "task.name": taskData.name,
          "task.label": taskData.label,
          "task.note": taskData.note,
          "task.status": taskData.status,
          "task.taskOfUser": taskData.taskOfUser,
          "task.crttmstmp": taskData.crttmstmp,
        },
      });
      toast.success("task edit successfully");
    } catch (error) {
      console.log("erro Upadate task", error);
      toast.error("failed to Upadet task");
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
                  <h2>Upadet task:</h2>
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
                            type="label"
                            name="label"
                            className="form-control"
                            value={taskData.label}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group">
                          <label>Note</label>
                          <input
                            type="note"
                            name="note"
                            className="form-control"
                            value={taskData.note}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Status</label>
                          <input
                            type="status"
                            name="status"
                            className="form-control"
                            value={taskData.status}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Task-User</label>
                          <input
                            type="taskuser"
                            name="taskuser"
                            className="form-control"
                            value={taskData.taskOfUser}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <button type="submit" className="btn btn-primary mt-4 rounded">
                          Save Changes
                        </button>
                        {/* <button type="button" className="btn btn-class mt-4 ml-3 rounded " onClick={back}>
                          Back
                        </button> */}
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
