import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import SidebarAdmin from "../components/sidebarAdmin/sidebarAdmin";
import HeaderAdmin from "../components/headerAdmin/HeaderAdmin";

const wrapper = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
};

const content = {
  width: "100%",
  minHeight: "calc(100vh )",
};
function AdminLayout({ children }) {
  return (
    <Box sx={wrapper}>
      <Box sx={content}>
        <Box
          sx={{
            display: "flex",
            maxWidth: "100%",
          }}
        >
          <SidebarAdmin />
          <Box sx={{ flex: 1 }}>
            <HeaderAdmin />
            <Box> {children}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminLayout;
