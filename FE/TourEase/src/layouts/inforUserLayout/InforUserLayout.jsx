import { Box, CircularProgress, Typography } from "@mui/material";

import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const wrapper = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
};

const content = {
  width: "100%",
  minHeight: "calc(100vh - 70px)",
  marginTop: "70px",
};

function InforUserLayout({ children }) {
  return (
    <>
      <Box sx={wrapper}>
        <Header />
        <Box sx={content}>
          <Box
            sx={{
              display: "flex",
              maxWidth: "100%",
            }}
          >
            <Sidebar />
            <Box sx={{ flex: 1 }}>{children}</Box>
          </Box>
        </Box>

        <Footer />
      </Box>
    </>
  );
}

export default InforUserLayout;
