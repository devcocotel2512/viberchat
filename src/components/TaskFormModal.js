import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import taskService from '../pages/services/taskService';
import authService from '../pages/services/authService';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const TaskFormModal = ({ recipientid,chatMsgToken,show, handleClose }) => {
  
  const retrievedUser = JSON.parse(localStorage.getItem("loginuser"));
  const retrievedId = localStorage.getItem("loginId");

  const [loggedInUser, setLoggedInUser] = useState(retrievedUser || {});  
  const [loggedInId, setLoggedInId] = useState(retrievedId || '');  
  

  const [taskDetails, setTaskDetails] = useState({ name: '', label: '', status: 'New', usersList: [], assignUsers: [], dueDate: '', note: '', taskOfUser: recipientid,chatMsgToken:chatMsgToken });
  console.log(taskDetails);
  const [validationErrors, setValidationErrors] = useState({ name: '', label: '' });

  useEffect(() => {
    // Fetch users list from API
    const fetchUsersList = async () => {
      try {
        const response = await authService.getData({
          searchquery: { _id: loggedInId },
          projection: { user: 1,_id:0 },
          showcount: 1,
        });
        if (response.data.status) {
          setTaskDetails((prevDetails) => ({
            ...prevDetails,
            usersList: response.data.data[0].user,
          }));
        } else {
          throw new Error(response.data.message || 'Failed to fetch users list');
        }
      } catch (error) {
        console.error('Error fetching users list:', error);
      }
    };

    fetchUsersList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  useEffect(() => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      taskOfUser: recipientid,
      chatMsgToken:chatMsgToken
    }));
  }, [recipientid,chatMsgToken]);
  const handleAssignUsersChange = (selectedOptions) => {
    const selectedUsers = selectedOptions.map(option => option.value);
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      assignUsers: selectedUsers,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Simple validation for required fields
      if (!taskDetails.name.trim() || !taskDetails.label.trim()) {
        throw new Error('Task name and label are required');
      }

      const response = await taskService.addTask(taskDetails);
      if (!response.data.status) {
        throw new Error(response.data.message || `HTTP error! status: ${response.data.status}`);
      }

      // Display success message
      toast.success('Task added successfully!');
      // Reset the form after successful submission
      setTaskDetails({ name: '', label: '', status: 'New', usersList: taskDetails.usersList, assignUsers: [], dueDate: '', note: '', taskOfUser: recipientid });
      handleClose(); // Close modal after successful submission

    } catch (error) {
      // Display error message
      toast.error(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={taskDetails.name}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.name} // Add isInvalid prop for Bootstrap validation
              required // Add required attribute for HTML5 validation
            />
            <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
            <Form.Text className="text-muted">
              Enter the task name.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Task Label</Form.Label>
            <Form.Control
              type="text"
              name="label"
              value={taskDetails.label}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.label} // Add isInvalid prop for Bootstrap validation
              required // Add required attribute for HTML5 validation
            />
            <Form.Control.Feedback type="invalid">{validationErrors.label}</Form.Control.Feedback>
            <Form.Text className="text-muted">
              Enter the task label.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Assign Users</Form.Label>
            <Select
              options={taskDetails.usersList.map(user => ({ value: user.un, label: user.un }))}
              value={taskDetails.assignUsers.map(user => ({ value: user, label: user }))}
              onChange={handleAssignUsersChange}
              isMulti
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={taskDetails.dueDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="note"
              value={taskDetails.note}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={taskDetails.status}
              onChange={handleInputChange}
            >
              <option value="New">New</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Open Deal">Open Deal</option>
              <option value="Unqualified">Unqualified</option>
              <option value="Won">Won</option>
              <option value="Close">Close</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Task
        </Button>
      </Modal.Footer>
      <ToastContainer /> {/* To display toast messages */}
    </Modal>
  );
};

export default TaskFormModal;
