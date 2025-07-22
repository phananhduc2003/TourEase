import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Box>
        <Link to="/">home</Link>
        <Link to="/tourpage">tourpage</Link>
        <Link to="/pagetest">pagetest</Link>
      </Box>
    </>
  );
}

export default HomePage;
