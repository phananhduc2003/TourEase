import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import bg from "../../../assets/images/signin.svg";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AppleIcon from "@mui/icons-material/Apple";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const vertical = "top";
const horizontal = "right";

function Login() {
  const authContext = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setOpen(false); // Đóng Snackbar khi người dùng nhập lại
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setOpen(false); // Đóng Snackbar khi người dùng nhập lại
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);

    const role = await authContext.handleLogin(username, password);

    if (role !== null) {
      if (role === 1) {
        navigate(`/homeadmin`);
      } else {
        navigate(`/`);
      }
    } else {
      setOpen(true);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {authContext.errorMessage ||
            "Failed! Enter correct username and password."}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          ...boxStyle,
          width: {
            xs: "98%",
            sm: "90%",
            lg: "75%",
          },
          height: {
            xs: "auto",
            sm: "80%",
            lg: "70%",
          },
          minHeight: { xs: "100vh", sm: "600px", lg: "unset" },
          p: { xs: 0, sm: 0, lg: 0 },
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            lg={6}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                lg: "block",
              },
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                marginTop: { xs: "10px", sm: "20px", lg: "40px" },
                marginLeft: { xs: "5px", sm: "10px", lg: "15px" },
                marginRight: { xs: "5px", sm: "10px", lg: "15px" },
                height: { xs: "20vh", sm: "30vh", lg: "63vh" },
                color: "#f5f5f5",
              }}
            ></Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            lg={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundSize: "cover",
                height: { xs: "auto", sm: "70vh", lg: "70vh" },
                minHeight: { xs: "100vh", sm: "500px", lg: "500px" },
                backgroundColor: "#3b33d5",
                px: { xs: 0, sm: 2, lg: 0 },
                py: { xs: 2, sm: 4, lg: 0 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Container maxWidth="xs" sx={{ p: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      mt: { xs: "20px", sm: "30px", lg: "35px" },
                      width: { xs: 40, sm: 50, lg: 56 },
                      height: { xs: 40, sm: 50, lg: 56 },
                    }}
                  >
                    <LockOutlinedIcon fontSize="medium" />
                  </Avatar>
                  <Typography
                    component="h1"
                    variant={window.innerWidth < 600 ? "h5" : "h4"}
                    sx={{ color: "#ffffff" }}
                  >
                    Sign In
                  </Typography>
                </Box>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  method="POST"
                  noValidate
                  sx={{ mt: { xs: 1, sm: 2 } }}
                >
                  <Grid container spacing={1}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        ml: { xs: "0.5em", sm: "2em", lg: "3em" },
                        mr: { xs: "0.5em", sm: "2em", lg: "3em" },
                      }}
                    >
                      <TextField
                        onChange={handleUsername}
                        required
                        fullWidth
                        autoComplete="off"
                        type="text"
                        id="username"
                        label="Username"
                        name="username"
                        InputProps={{
                          style: { color: "#ffffff" },
                        }}
                        InputLabelProps={{
                          style: { color: "#ffffff" },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ffffff",
                            },
                            "&:hover fieldset": {
                              borderColor: "#ffffff",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#ffffff",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#ffffff",
                          },
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        ml: { xs: "0.5em", sm: "2em", lg: "3em" },
                        mr: { xs: "0.5em", sm: "2em", lg: "3em" },
                      }}
                    >
                      <TextField
                        onChange={handlePassword}
                        required
                        fullWidth
                        autoComplete="off"
                        type="password"
                        id="password"
                        label="Password"
                        name="password"
                        InputProps={{
                          style: { color: "#ffffff" },
                        }}
                        InputLabelProps={{
                          style: { color: "#ffffff" },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#ffffff",
                            },
                            "&:hover fieldset": {
                              borderColor: "#ffffff",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#ffffff",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#ffffff",
                          },
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        ml: { xs: "0.5em", sm: "2em", lg: "3em" },
                        mr: { xs: "0.5em", sm: "2em", lg: "3em" },
                        mt: "10px",
                        mb: "10px",
                      }}
                    >
                      {/* Sửa đoạn này để các button cách đều và space-between */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          gap: 2,
                        }}
                      >
                        <Button
                          onClick={handleGoogleLogin}
                          sx={{
                            height: { xs: "38px", sm: "40px", lg: "44px" },
                            width: "56px",
                            minWidth: 0,
                            backgroundColor: "#fff",
                            color: "#3b33d5",
                            "&:hover": { backgroundColor: "#f0f0f0" },
                            borderRadius: 2,
                          }}
                          variant="contained"
                          disableElevation
                        >
                          <GoogleIcon
                            fontSize={
                              window.innerWidth < 600 ? "small" : "medium"
                            }
                          />
                        </Button>
                        <Button
                          sx={{
                            height: { xs: "38px", sm: "40px", lg: "44px" },
                            width: "56px",
                            minWidth: 0,
                            backgroundColor: "#fff",
                            color: "#3b33d5",
                            "&:hover": { backgroundColor: "#f0f0f0" },
                            borderRadius: 2,
                          }}
                          variant="contained"
                          disableElevation
                        >
                          <FacebookIcon
                            fontSize={
                              window.innerWidth < 600 ? "small" : "medium"
                            }
                          />
                        </Button>
                        <Button
                          sx={{
                            height: { xs: "38px", sm: "40px", lg: "44px" },
                            width: "56px",
                            minWidth: 0,
                            backgroundColor: "#fff",
                            color: "#3b33d5",
                            "&:hover": { backgroundColor: "#f0f0f0" },
                            borderRadius: 2,
                          }}
                          variant="contained"
                          disableElevation
                        >
                          <LinkedInIcon
                            fontSize={
                              window.innerWidth < 600 ? "small" : "medium"
                            }
                          />
                        </Button>
                        <Button
                          sx={{
                            height: { xs: "38px", sm: "40px", lg: "44px" },
                            width: "56px",
                            minWidth: 0,
                            backgroundColor: "#fff",
                            color: "#3b33d5",
                            "&:hover": { backgroundColor: "#f0f0f0" },
                            borderRadius: 2,
                          }}
                          variant="contained"
                          disableElevation
                        >
                          <AppleIcon
                            fontSize={
                              window.innerWidth < 600 ? "small" : "medium"
                            }
                          />
                        </Button>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        ml: { xs: "1em", sm: "3em", lg: "5em" },
                        mr: { xs: "1em", sm: "3em", lg: "5em" },
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth={true}
                        size={window.innerWidth < 600 ? "medium" : "large"}
                        sx={{
                          mt: { xs: "8px", sm: "10px" },
                          mr: { xs: 0, sm: "20px" },
                          borderRadius: 28,
                          color: "#ffffff",
                          minWidth: { xs: "120px", sm: "150px", lg: "170px" },
                          backgroundColor: "#FF9A01",
                          fontSize: { xs: "1rem", sm: "1.1rem", lg: "1.2rem" },
                        }}
                      >
                        Sign in
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        ml: { xs: "0.5em", sm: "2em", lg: "3em" },
                        mr: { xs: "0.5em", sm: "2em", lg: "3em" },
                      }}
                    >
                      <Stack direction="row" spacing={2}>
                        <Typography
                          variant="body1"
                          component="span"
                          style={{
                            marginTop: "10px",
                            color: "#ffffff",
                            fontSize:
                              window.innerWidth < 600 ? "0.95rem" : "1rem",
                          }}
                        >
                          Not registered yet?{" "}
                          <span
                            style={{ color: "#beb4fb", cursor: "pointer" }}
                            onClick={() => {
                              navigate("/register");
                            }}
                          >
                            Create an Account
                          </span>
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Login;
