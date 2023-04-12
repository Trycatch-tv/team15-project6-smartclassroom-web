import "./App.css";
import Box from "@mui/material/Box";
import Footer from "./components/Footer/footer";
import TopBar from "./components/Topbar/topbar";
import List2 from "./components/courses/list2";
import LeftMenu from "./components/LeftMenu";
import { Container, Divider } from "@mui/material";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
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
          <List2 />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
