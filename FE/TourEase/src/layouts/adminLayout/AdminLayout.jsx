import { Box } from "@mui/material";
import PropTypes from "prop-types";
import SidebarAdmin from "../components/sidebarAdmin/sidebarAdmin";
import HeaderAdmin from "../components/headerAdmin/HeaderAdmin";

const wrapper = {
  width: "100%",
  display: "flex",
  height: "100vh",
  overflow: "hidden",
};

function AdminLayout({ children }) {
  return (
    <Box sx={wrapper}>
      <SidebarAdmin />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <HeaderAdmin />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
