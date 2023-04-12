import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#DADDD8'
    },
    secondary: {
      main: '#C7D59F',
    },
    error: {
      main: red.A400,
    }
  },
});

export default theme;