// frontend/src/components/Navbar.js (Final Polished Version)
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

// A simple icon that represents data/analytics
import InsightsIcon from '@mui/icons-material/Insights';

const Navbar = ({ onAddNewJob }) => {
  return (
    // We use position="sticky" to keep it at the top, and change the background color
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'text.primary' }} elevation={2}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <InsightsIcon sx={{ color: 'primary.main', mr: 1, display: { xs: 'none', md: 'flex' } }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'primary.main', // Use theme color for text
              textDecoration: 'none',
            }}
          >
            AlphaCareers
          </Typography>
          <Button variant="contained" color="secondary" onClick={onAddNewJob} sx={{boxShadow: 'none'}}>
            Post a Job
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;