import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Divider from "@mui/material/Divider";

import logo from "../../../assets/images/logoweb.png";
import DarkMode from "../../../theme/DarkMode";

function Header() {
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

  const menuItems = ["Trang Chủ", "Giới Thiệu", "Tour", "Điểm Đến", "Liên Hệ"];

  const isAuthenticated = true; // Replace with actual authentication logic

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
            <MenuItem
              sx={{ width: 200, color: "text.primary" }}
              onClick={handleClose}
            >
              Trang Chủ
            </MenuItem>
            <Divider />
            <MenuItem
              sx={{ width: 200, color: "text.primary" }}
              onClick={handleClose}
            >
              Giới Thiệu
            </MenuItem>
            <Divider />
            <MenuItem
              sx={{ width: 200, color: "text.primary" }}
              onClick={handleClose}
            >
              Tour
            </MenuItem>
            <Divider />
            <MenuItem
              sx={{ width: 200, color: "text.primary" }}
              onClick={handleClose}
            >
              Điểm Đến
            </MenuItem>
            <Divider />
            <MenuItem
              sx={{ width: 200, color: "text.primary" }}
              onClick={handleClose}
            >
              Liên Hệ
            </MenuItem>
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
                key={item}
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
                onClick={() => setActiveIndex(idx)}
              >
                {item}
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
                        // onClick={() => handleNavigation("/login")}
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
                        // onClick={() => handleNavigation("/login")}
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
                        // onClick={Logout}
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
