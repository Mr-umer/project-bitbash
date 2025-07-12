// frontend/src/components/JobRow.js
import React, { useState } from 'react';
import {
  Paper, Box, Typography, Chip, Button, Avatar, Grid, IconButton,
  Menu, MenuItem, ListItemIcon, ListItemText
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const getInitials = (companyName) => {
  if (!companyName) return '?';
  const words = companyName.split(' ');
  return (words.length > 1 ? `${words[0][0]}${words[1][0]}` : companyName.substring(0, 2)).toUpperCase();
};

const JobRow = ({ job, onEdit, onDelete, onViewDetails, isFeatured }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleEdit = () => { onEdit(job); handleMenuClose(); };
  const handleDelete = () => { onDelete(job.id); handleMenuClose(); };

  const tagsToShow = job.tags ? job.tags.split(',').slice(0, 4) : [];
  const isNew = job.posting_date.includes('h ago');

  return (
    <Paper
      elevation={2}
      sx={{
        position: 'relative',
        p: { xs: 2, md: 3 },
        mb: 3,
        borderRadius: '12px',
        border: '1px solid #e0e0e0',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: 6,
          borderColor: 'secondary.main',
        },
      }}
    >
      {/* Top-right corner menu */}
      <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
        <IconButton onClick={handleMenuClick} size="small">
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                mr: 2,
                width: 56,
                height: 56,
              }}
            >
              {getInitials(job.company)}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {job.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="body1" color="text.primary">
                  {job.company}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {job.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • {job.posting_date}
                </Typography>
                {isNew && <Chip label="New" color="success" size="small" sx={{ height: '20px' }} />}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Tags Row */}
      {tagsToShow.length > 0 && (
        <Box sx={{ mt: 2, pl: { xs: 0, sm: 9.5 } }}>
          {tagsToShow.map((tag, index) => (
            <Chip key={index} label={tag.trim()} size="small" sx={{ mr: 1, mb: 1, bgcolor: '#f1f1f1' }} />
          ))}
        </Box>
      )}

      {/* Bottom-right View Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onViewDetails(job)}
          sx={{ boxShadow: 'none' }}
        >
          View Details
        </Button>
      </Box>
    </Paper>
  );
};

export default JobRow;
