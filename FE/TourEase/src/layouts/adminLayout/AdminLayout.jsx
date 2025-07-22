import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

function AdminLayout({ children }) {
  return (
    <>
      <Typography variant="subtitle">AdminLayout</Typography>
      <Box>{children}</Box>
    </>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminLayout;
