import { Box } from "@mui/material";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import { useAuth } from "../../../context/AuthContext";

function Sidebar() {
  const useContext = useAuth();

  const userId = useContext.idUser;

  return (
    <>
      <Box
        sx={{
          width: "356px",
          p: " 20px 0px 26px 8px",
          ml: "-18px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "background.paper",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <Menu>
          <MenuItem title="Profile" to="/profile" />
          <MenuItem title="Booking" to={`/infor-booking/${userId}`} />
        </Menu>
      </Box>
    </>
  );
}

export default Sidebar;
