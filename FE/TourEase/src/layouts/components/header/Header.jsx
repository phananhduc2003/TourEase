import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import { useNavigate } from "react-router-dom";

import logo from "../../../assets/images/logoweb.png";
import DarkMode from "../../../theme/DarkMode";
import { useAuth } from "../../../context/AuthContext";

const wrapper = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  width: "100%",
  height: "70px",
  backgroundColor: "background.default",
  boxShadow: 4,
  zIndex: 1200,
};

function Header() {
  const menuItems = [
    { name: "Trang Chủ", path: "/" },
    { name: "Giới Thiệu", path: "/introduction" },
    { name: "Tour", path: "/tours" },
    { name: "Điểm Đến", path: "/destinations" },
    { name: "Liên Hệ", path: "/contact" },
  ];

  const navigate = useNavigate();

  const { isAuthenticated, Logout } = useAuth();

  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigationLogin = () => {
    navigate("/login");
  };

  const handleNavigationRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    Logout();
  };

  return (
    <>
      <Box sx={wrapper}>
        <Box>
          {/* logo */}
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "none",
                lg: "block ",
              },
              ml: 3,
            }}
          >
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
          </Box>

          {/* reponsive menu */}
          <Box
            onClick={handleClick}
            sx={{
              display: {
                xs: "block",
                sm: "block",
                lg: "none",
              },
              ml: 3,
              cursor: "pointer",
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MenuIcon
              sx={{ color: "#ef6c00", height: "32px", width: "32px" }}
            />
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {menuItems
              .map((item, index) => [
                <MenuItem
                  key={item.name}
                  sx={{ width: 200, color: "text.primary" }}
                  onClick={() => {
                    handleClose();
                    navigate(item.path);
                  }}
                >
                  {item.name}
                </MenuItem>,
                index < menuItems.length - 1 && (
                  <Divider key={`divider-${item.name}`} />
                ),
              ])
              .flat()}
          </Menu>
        </Box>

        <Box>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "none",
                lg: "flex",
              },
              alignItems: "center",
              backgroundColor: "primary.light",
              borderRadius: "25px",
              height: "48px",
              px: "4px",
              minWidth: 500,
              border: "2px solid primary.main",
            }}
          >
            {menuItems.map((item, idx) => (
              <Box
                key={item.name}
                sx={{
                  height: "42px",
                  width: "100px",
                  backgroundColor:
                    activeIndex === idx || hoverIndex === idx
                      ? "primary.main"
                      : "transparent",
                  color:
                    activeIndex === idx || hoverIndex === idx
                      ? "#fff"
                      : "text.primary",
                  borderRadius: "25px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => {
                  setActiveIndex(idx);
                  navigate(item.path);
                  window.scrollTo(0, 0);
                }}
              >
                {item.name}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", mr: 3 }}>
          <Box></Box>
          <Box>
            <Grid container spacing={2} alignItems={"center"}>
              <Grid item sx={{ position: "relative" }}>
                <SearchIcon
                  sx={{
                    display: { xs: "none", sm: "none", lg: "block" },
                    position: "absolute",
                    right: 0,
                    top: 4,
                  }}
                />
              </Grid>

              <Grid item sx={{ mr: 1 }}>
                <DarkMode />
              </Grid>

              <Grid item>
                {!isAuthenticated ? (
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={1}
                  >
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          cursor: "pointer",
                          "&:hover": {
                            color: "text.secondary",
                          },
                        }}
                        onClick={handleNavigationRegister}
                      >
                        Sign Up
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>|</Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          cursor: "pointer",
                          "&:hover": {
                            color: "text.secondary",
                          },
                        }}
                        onClick={handleNavigationLogin}
                      >
                        Sign In
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
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
                          top: -7,
                          width: 30,
                          height: 30,

                          cursor: "pointer",
                          color: "primary.main",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        sx={{
                          display: { xs: "none", sm: "none", lg: "block" },
                        }}
                      >
                        |
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          cursor: "pointer",
                          "&:hover": {
                            color: "text.secondary",
                          },
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Header;
