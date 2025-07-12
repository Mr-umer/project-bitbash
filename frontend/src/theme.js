// frontend/src/theme.js (Final Polished Version)
import { createTheme } from '@mui/material/styles';

const primaryColor = '#1e1740';
const accentColor = '#21b6a8'; // A vibrant but professional teal for CTAs

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: accentColor, // Our main Call-to-Action color
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#6b7280', // The muted gray you suggested
    },
    neutral: {
      light: '#f1f1f1', // Lighter gray for tags
      main: '#e0e0e0',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    // Job Title Style
    h5: {
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    // Company Name Style
    body1: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    // Meta Info Style
    body2: {
      color: '#6b7280', // Muted gray
      fontSize: '0.9rem',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 'bold',
        },
        // Main CTA button style
        containedSecondary: {
            color: 'white',
            '&:hover': {
                backgroundColor: '#1aa396' // A slightly darker teal on hover
            }
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // The hover effect you requested
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

export default theme;