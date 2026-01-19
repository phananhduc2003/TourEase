import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

function MenuItem({ title, to, icon }) {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Box sx={{ display: "flex" }}>
          <Box
            className={isActive ? "active" : ""}
            sx={{
              display: "flex",
              width: "100%",
              height: "58px",
              p: "8px",
              color: "text.primary",
              fontSize: "1rem",
              fontWeight: 500,
              alignItems: "center",

              borderBottom: "1px solid",
              transition: "background-color 200ms ease-in-out",

              "&.active": {
                color: "primary.main",
                fontSize: "1.2rem",
                ml: "4px",
              },

              "&:hover": {
                ml: "4px",
              },
            }}
          >
            <Box
              sx={{
                ml: 1,
                mr: 1,
                display: "flex",
                alignItems: "center",
                position: "relative",
                top: 0,
                bottom: "8px",
              }}
            >
              {icon}
            </Box>
            <Box>{title}</Box>
          </Box>
        </Box>
      )}
    </NavLink>
  );
}

export default MenuItem;
