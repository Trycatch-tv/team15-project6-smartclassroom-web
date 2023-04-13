import "./App.css";
import Box from "@mui/material/Box";
import Footer from "./components/generic/Footer";
import TopBar from "./components/generic/TopBar";
import LeftMenu from "./components/generic/LeftMenu";
import router from './router';
import { useRoutes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  const content = useRoutes(router);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar></TopBar>
        <LeftMenu />
        <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
            component="main"
            className="mainContainer"
          > 
            {content}
        </Box>
        <Footer />
      </Box>
  </ThemeProvider>
  );
}

export default App;
