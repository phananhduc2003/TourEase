import { Box, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function DefaultLayout({ children }) {
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />
      <Box
        sx={{
          mt: "70px",
          minHeight: "calc(100vh - 70px)",
          position: "relative",
        }}
      >
        {pageLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          children
        )}
      </Box>

      <Footer />
    </Box>
  );
}

export default DefaultLayout;
