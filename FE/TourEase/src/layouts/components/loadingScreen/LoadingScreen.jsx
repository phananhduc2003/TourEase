import { Box, LinearProgress } from "@mui/material";

function LoadingScreen() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
    >
      <LinearProgress />
    </Box>
  );
}

export default LoadingScreen;
