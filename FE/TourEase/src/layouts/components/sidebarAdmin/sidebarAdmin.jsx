import { Box } from "@mui/material";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import SpeedIcon from "@mui/icons-material/Speed";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

function SidebarAdmin() {
  return (
    <>
      <Box
        sx={{
          width: "300px",
          p: " 20px 0px 26px 8px",
          ml: "-18px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "background.paper",
          minHeight: "calc(100vh)",
        }}
      >
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
