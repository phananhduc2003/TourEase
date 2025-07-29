import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";
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

function DefaultLayout({ children }) {
  return (
    <>
      <Box sx={wrapper}>
        <Header />
        <Box sx={content}>{children}</Box>
        <Footer />
      </Box>
    </>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
