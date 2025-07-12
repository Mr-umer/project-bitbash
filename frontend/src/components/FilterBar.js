// frontend/src/components/FilterBar.js (Corrected Grid)
import React from 'react';
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          placeholder="Job title, company, or keyword"
          name="search"
          value={filters.search || ''}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid xs={12} sm={6} md={3}>
         <TextField
          fullWidth
          placeholder="Location"
          name="location"
          value={filters.location || ''}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Job Type</InputLabel>
          <Select
            name="job_type"
            value={filters.job_type || 'All'}
            label="Job Type"
            onChange={handleInputChange}
          >
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FilterBar;