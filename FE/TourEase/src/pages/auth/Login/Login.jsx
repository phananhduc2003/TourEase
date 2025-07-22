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
      <Box sx={boxStyle}>
        <Grid container>
          <Grid item xs={12} sm={12} lg={6}>
            <Box
              sx={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover", //Dieu chinh kich thuoc cho anh
                marginTop: "40px",
                marginLeft: "15px",
                marginRight: "15px",
                height: "63vh",
                color: "#f5f5f5",
              }}
            ></Box>
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <Box
              sx={{
                backgroundSize: "cover",
                height: "70vh",
                minHeight: "500px",
                backgroundColor: "#3b33d5",
              }}
            >
              <Container>
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
                      mt: "35px",
                    }}
                  >
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography
                    component="h1"
                    variant="h4"
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
                  sx={{ mt: 2 }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
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
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
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
                    <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth={true}
                        size="large"
                        sx={{
                          mt: "10px",
                          mr: "20px",
                          borderRadius: 28,
                          color: "#ffffff",
                          minWidth: "170px",
                          backgroundColor: "#FF9A01",
                        }}
                      >
                        Sign in
                      </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <Stack direction="row" spacing={2}>
                        <Typography
                          variant="body1"
                          component="span"
                          style={{ marginTop: "10px", color: "#ffffff" }}
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
