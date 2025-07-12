// frontend/src/components/AddJobForm.js
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

// Default empty form state
const emptyForm = { title: '', company: '', location: '', job_type: '', tags: '' };

const AddJobForm = ({ onSave, handleClose, jobToEdit }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Check if we are editing or adding a new job
  const isEditing = jobToEdit !== null;

  // If jobToEdit changes, pre-fill the form
  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: jobToEdit.title || '',
        company: jobToEdit.company || '',
        location: jobToEdit.location || '',
        job_type: jobToEdit.job_type || '',
        tags: jobToEdit.tags || '',
      });
    } else {
      setFormData(emptyForm); // Reset to empty for "Add"
    }
  }, [jobToEdit, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = "Title is required.";
    if (!formData.company) tempErrors.company = "Company is required.";
    if (!formData.location) tempErrors.location = "Location is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData, jobToEdit ? jobToEdit.id : null); // Pass back data and ID if editing
    }
  };

  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        {isEditing ? 'Edit Job' : 'Add a New Job'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          margin="normal"
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          fullWidth
          required
          margin="normal"
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          error={!!errors.company}
          helperText={errors.company}
        />
        <TextField
          fullWidth
          required
          margin="normal"
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          error={!!errors.location}
          helperText={errors.location}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Job Type (e.g., Full-time)"
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Tags (comma-separated)"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {isEditing ? 'Save Changes' : 'Add Job'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddJobForm;