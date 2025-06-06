import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";

function DefaultLayout({ children }) {
  return (
    <>
      <Typography variant="subtitle">DefaultLayout</Typography>
      <Box>{children}</Box>
    </>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
