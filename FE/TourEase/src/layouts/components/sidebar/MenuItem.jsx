import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

function MenuItem({ title, to }) {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Box
          className={isActive ? "active" : ""}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: "8px",
            color: "text.primary",
            fontSize: "1.6rem",
            fontWeight: 700,
            borderRadius: 1,
            transition: "background-color 200ms ease-in-out",

            "&.active": {
              color: "primary.main",
              fontSize: "1.9rem",
            },

            "&:hover": {
              backgroundColor: "sidebar.menu",
            },
          }}
        >
          <Box>{title}</Box>
        </Box>
      )}
    </NavLink>
  );
}

export default MenuItem;
