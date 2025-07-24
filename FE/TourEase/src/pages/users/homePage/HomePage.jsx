import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function HomePage() {
  const authContext = useAuth();
  const Logout = () => {
    authContext.Logout();
  };

  return (
    <>
      <Box>
        <Link to="/">home</Link>
        <Link to="/tourpage">tourpage</Link>
        <Link to="/pagetest">pagetest</Link>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            "&:hover": {
              color: "text.secondary",
            },
          }}
          onClick={Logout}
        >
          Logout
        </Typography>
      </Box>
    </>
  );
}

export default HomePage;
