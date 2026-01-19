import { Box, Typography } from "@mui/material";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import SpeedIcon from "@mui/icons-material/Speed";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

import logo from "../../../assets/images/logoweb.png";

function SidebarAdmin() {
  return (
    <>
      <Box
        sx={{
          width: "260px",
          p: "  0px 26px 8px",
          ml: "-18px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "secondary.light",
          minHeight: "calc(100vh)",
        }}
      >
        <Box sx={{ display: "flex", my: 1 }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: "75px",
              width: "auto",
              cursor: "pointer",
              color: "Background.default",
            }}
          ></Box>
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: " bold",
              position: "relative",
              color: "#ef6c00",
              top: 22,
            }}
          >
            Admin
          </Typography>
        </Box>

        <Menu>
          <MenuItem title="Dashboard" to="/dashboard" icon={<SpeedIcon />} />
          <MenuItem
            title="Quản lý admin"
            to="/manage-admin"
            icon={<AssessmentIcon />}
          />
          <MenuItem
            title="Quản lý tour"
            to="/manage-tours"
            icon={<AssessmentIcon />}
          />
          <MenuItem
            title="Quản lý người dùng"
            to="/manage-users"
            icon={<AssessmentIcon />}
          />
          <MenuItem
            title="Quản lý đặt tour"
            to="/manage-bookings"
            icon={<BookmarkAddedIcon />}
          />
        </Menu>
      </Box>
    </>
  );
}

export default SidebarAdmin;
