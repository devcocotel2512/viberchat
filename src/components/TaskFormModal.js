import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskFormModal = ({ show, handleClose, handleCreateTask }) => {
  const [taskDetails, setTaskDetails] = useState({ name: '', label: '', status: 'pending' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Perform the API call to create a task
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Task created successfully:', data);
        // Pass the new task data to the parent component
        handleCreateTask(data);
        // Close the modal and reset the form
        setTaskDetails({ name: '', label: '', status: 'pending' });
        handleClose();
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
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
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Task Label</Form.Label>
            <Form.Control
              type="text"
              name="label"
              value={taskDetails.label}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Task Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={taskDetails.status}
              onChange={handleInputChange}
            >
              <option value="pending">Pending</option>
              <option value="working">Working</option>
              <option value="done">Done</option>
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
    </Modal>
  );
};

export default TaskFormModal;
