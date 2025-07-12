// frontend/src/components/Footer.js (Corrected Grid)
import React from 'react';
import { Box, Typography, Link, Container, TextField, Button, Stack, IconButton, Grid } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#111326', color: 'rgba(255, 255, 255, 0.7)', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>AlphaCareers</Typography>
            <Typography variant="body2">Generate your career alpha. The hub for elite quantitative roles.</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton href="#" color="inherit"><LinkedInIcon /></IconButton>
              <IconButton href="#" color="inherit"><TwitterIcon /></IconButton>
            </Stack>
          </Grid>
          <Grid xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>Company</Typography>
            <Link href="#" color="inherit" display="block" underline="hover">About</Link>
            <Link href="#" color="inherit" display="block" underline="hover">Contact</Link>
          </Grid>
          <Grid xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>Legal</Typography>
            <Link href="#" color="inherit" display="block" underline="hover">Terms</Link>
            <Link href="#" color="inherit" display="block" underline="hover">Privacy</Link>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>Stay Updated</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>Subscribe to our newsletter for the latest jobs.</Typography>
            <Stack direction="row">
              <TextField 
                variant="filled" 
                size="small" 
                placeholder="Enter your email" 
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1, flexGrow: 1, '& .MuiInputBase-root': { color: 'white' } }} 
              />
              <Button variant="contained" color="secondary" sx={{ ml: 1 }}>Subscribe</Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;