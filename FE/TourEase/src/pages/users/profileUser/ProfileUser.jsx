import {
  Alert,
  Box,
  Button,
  Grid,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ApiGetInforProfileUser } from "../../../api/user/ApiGetInforProfileUser";

import { ApiUpdateProfileUser } from "../../../api/user/ApiUpdateProfileUser";

import { useAuth } from "../../../context/AuthContext";

const vertical = "top";
const horizontal = "right";

function ProfileUser() {
  const useContext = useAuth();

  const userId = useContext.idUser;

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [open, setOpen] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  useEffect(() => {
    if (userId) {
      getProfileUser(userId);
    }
  }, [userId]);

  const getProfileUser = (userId) => {
    ApiGetInforProfileUser(userId)
      .then((response) => {
        const data = response.data;
        setFullName(data.fullName || "");
        setAddress(data.address || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phoneNumber || "");
      })
      .catch((error) => {
        console.error("Error fetching profile user data:", error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      fullName,
      address,
      email,
      phoneNumber,
    };
    try {
      const response = await ApiUpdateProfileUser(userId, formData);

      if (response.status === 200) {
        setMessageSuccess("Cập nhật thông tin thành công");
        setMessageError("");
        setOpen(true);
      }
    } catch (error) {
      // Nếu response trả về 400
      if (error.response && error.response.status === 400) {
        setMessageError(error.response.data.message);
        setMessageSuccess("");
        setOpen(true);
      } else {
        setMessageError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        setMessageSuccess("");
        setOpen(true);
      }
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        {messageError ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {messageError}
          </Alert>
        ) : messageSuccess ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {messageSuccess}
          </Alert>
        ) : null}
      </Snackbar>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",

            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              p: 3,
              width: "50%",
              bgcolor: "background.paper",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              my: 3,
            }}
          >
            <Typography sx={{ mb: 2, fontSize: "1.5rem", fontWeight: "bold" }}>
              Thông tin cá nhân
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
                  Họ và tên
                </Typography>
                <TextField
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  id="fullName"
                  name="fullName"
                  required
                  fullWidth
                  autoComplete="off"
                  type="text"
                  sx={{
                    mb: 3,
                    backgroundColor: "background.default",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
                  Địa Chỉ
                </Typography>
                <TextField
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  name="address"
                  required
                  fullWidth
                  autoComplete="off"
                  type="text"
                  sx={{
                    mb: 3,
                    backgroundColor: "background.default",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
                  Email
                </Typography>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  required
                  fullWidth
                  autoComplete="off"
                  type="text"
                  sx={{
                    mb: 3,
                    backgroundColor: "background.default",
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
                  Phone Number
                </Typography>
                <TextField
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  fullWidth
                  autoComplete="off"
                  type="text"
                  sx={{
                    mb: 3,
                    backgroundColor: "background.default",
                  }}
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                height: "40px",
                backgroundColor: "primary.main",
                color: "white",
                width: "100%",
              }}
            >
              Lưu thông tin
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProfileUser;
