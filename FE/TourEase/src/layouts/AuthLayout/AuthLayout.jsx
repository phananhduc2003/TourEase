import { Box } from "@mui/material";
import PropTypes from "prop-types";

function AuthLayout({ children }) {
  return (
    <>
      <Box>{children}</Box>
    </>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthLayout;
