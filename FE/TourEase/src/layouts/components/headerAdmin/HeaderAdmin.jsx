import { Box, Grid, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkMode from "../../../theme/DarkMode";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const wrapper = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  top: 0,
  height: "50px",
  backgroundColor: "background.paper",
  boxShadow: "0px 4px 1px  rgba(0, 0, 0, 0.1)",
  zIndex: 1200,
};

function HeaderAdmin() {
  return (
    <>
      <Box sx={wrapper}>
        <Box>
          <MenuIcon sx={{ ml: 2, cursor: "pointer", fontSize: "30px" }} />
        </Box>
        <Box sx={{ mr: 3 }}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item sx={{ mr: 4 }}>
              <DarkMode />
            </Grid>
            <Grid item sx={{ position: "relative" }}>
              <EmailIcon
                sx={{
                  position: "absolute",
                  right: 15,
                  top: 4,
                }}
              />
            </Grid>

            <Grid item>
              <Grid
                container
                alignItems="center"
                justifyContent="flex-end"
                spacing={1}
              >
                <Grid item sx={{ position: "relative" }}>
                  <AccountCircleIcon
                    sx={{
                      position: "absolute",
                      left: -20,
                      top: -10,
                      width: 35,
                      height: 35,
                      cursor: "pointer",
                      color: "primary.main",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default HeaderAdmin;
