// frontend/src/components/JobDetailsModal.js (Robust Version)
import React from 'react';
import { Modal, Box, Typography, Divider, IconButton, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', md: 700 },
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const JobDetailsModal = ({ job, open, onClose }) => {
  if (!job) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
          {job.title}
        </Typography>
        <Typography variant="h6" color="primary.main" gutterBottom>
          {job.company}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {job.location}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Tags & Keywords
        </Typography>
        <Box sx={{ my: 2 }}>
            {job.tags && job.tags.split(',').map((tag, index) => (
                <Chip key={index} label={tag.trim()} sx={{ m: 0.5 }} />
            ))}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Posted: {job.posting_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Job Type: {job.job_type}
        </Typography>
      </Box>
    </Modal>
  );
};

export default JobDetailsModal;