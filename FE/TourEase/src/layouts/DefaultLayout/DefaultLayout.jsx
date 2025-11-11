import PropTypes from "prop-types";

import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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

function DefaultLayout({ children }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Box sx={wrapper}>
        <Header />
        <Box sx={content}>
          {isLoading ? (
            <Box
              sx={{
                position: "relative",
                minHeight: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Đang tải...</Typography>
            </Box>
          ) : (
            children
          )}
        </Box>
        <Footer />
      </Box>
    </>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
