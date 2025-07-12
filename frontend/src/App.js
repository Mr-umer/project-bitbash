// frontend/src/App.js (The Definitive Final Version with Perfect Alignment)

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import JobRow from './components/JobRow';
import AddJobForm from './components/AddJobForm';
import FilterBar from './components/FilterBar';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import JobDetailsModal from './components/JobDetailsModal';

import { Container, Typography, CircularProgress, Box, Alert, Modal, Paper, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://127.0.0.1:5000/api';
const initialFilters = { search: '', location: '', job_type: 'All', sort: 'date_desc' };
const JOBS_PER_PAGE = 15;

function App() {
  const [allJobs, setAllJobs] = useState([]);
  const [visibleJobsCount, setVisibleJobsCount] = useState(JOBS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.location) params.location = filters.location;
      if (filters.job_type && filters.job_type !== 'All') params.job_type = filters.job_type;
      if (filters.sort) params.sort = filters.sort;

      const response = await axios.get(`${API_URL}/jobs`, { params });
      setAllJobs(response.data);
      setVisibleJobsCount(JOBS_PER_PAGE);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs. Is the backend server running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const handler = setTimeout(() => { fetchJobs(); }, 500);
    return () => { clearTimeout(handler); };
  }, [filters, fetchJobs]);

  const handleShowMore = () => setVisibleJobsCount(prev => prev + JOBS_PER_PAGE);
  const handleShowLess = () => {
    setVisibleJobsCount(JOBS_PER_PAGE);
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleOpenAddModal = () => { setJobToEdit(null); setOpenAddEditModal(true); };
  const handleOpenEditModal = (job) => { setJobToEdit(job); setOpenAddEditModal(true); };
  const handleCloseAddEditModal = () => { setOpenAddEditModal(false); setJobToEdit(null); };
  const handleOpenDetailsModal = (job) => setSelectedJobDetails(job);
  const handleCloseDetailsModal = () => setSelectedJobDetails(null);

  const handleSaveJob = async (jobData, jobId) => {
    const isEditing = !!jobId;
    const action = isEditing
      ? axios.put(`${API_URL}/jobs/${jobId}`, jobData)
      : axios.post(`${API_URL}/jobs`, jobData);
    try {
      await action;
      toast.success(isEditing ? 'Job updated successfully!' : 'Job added successfully!');
      fetchJobs();
    } catch (err) {
      toast.error('Failed to save job.');
    } finally {
      handleCloseAddEditModal();
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`${API_URL}/jobs/${jobId}`);
        toast.success('Job deleted successfully!');
        fetchJobs();
      } catch (err) {
        toast.error('Failed to delete job.');
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Navbar onAddNewJob={handleOpenAddModal} />

      <main style={{ flexGrow: 1 }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Generate Your Career Alpha
            </Typography>
            <Typography variant="h6" color="rgba(255, 255, 255, 0.8)" sx={{ textAlign: 'center', mb: 5 }}>
              Discover elite roles where your analytical skills will drive market-beating performance.
            </Typography>
          </Container>
        </Box>

        {/* This container now holds both the FilterBar and the results */}
        <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 1 }} id="results-section">
          {/* We wrap the FilterBar in a Paper component here */}
          <Paper elevation={4} sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: '12px' }}>
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          </Paper>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Box>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Showing {Math.min(visibleJobsCount, allJobs.length)} of {allJobs.length} open positions
              </Typography>
              {allJobs.length > 0 ? allJobs.slice(0, visibleJobsCount).map((job) => (
                <JobRow
                  key={job.id}
                  job={job}
                  onDelete={handleDeleteJob}
                  onEdit={handleOpenEditModal}
                  onViewDetails={handleOpenDetailsModal}
                />
              )) : (
                <Paper sx={{ p: 5, textAlign: 'center', boxShadow: 'none', bgcolor: 'transparent' }}>
                  <Typography variant="h6" color="text.secondary">No jobs found matching your criteria.</Typography>
                </Paper>
              )}

              <Box sx={{
                textAlign: 'center',
                mt: 4,
                mb: 6,  
                display: 'flex',
                justifyContent: 'center',
                gap: 2
              }}>

                {visibleJobsCount < allJobs.length && (
                  <Button variant="contained" color="secondary" size="large" onClick={handleShowMore}>
                    Show More
                  </Button>
                )}
                {visibleJobsCount > JOBS_PER_PAGE && allJobs.length > JOBS_PER_PAGE && (
                  <Button variant="outlined" size="large" onClick={handleShowLess}>
                    Show Less
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Container>
      </main>

      <Modal open={openAddEditModal} onClose={handleCloseAddEditModal}>
        <AddJobForm onSave={handleSaveJob} handleClose={handleCloseAddEditModal} jobToEdit={jobToEdit} />
      </Modal>

      <JobDetailsModal job={selectedJobDetails} open={!!selectedJobDetails} onClose={handleCloseDetailsModal} />

      <Footer />
    </Box>
  );
}

export default App;