import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ApiGetInforProfileUser } from "../../../api/user/ApiGetInforProfileUser";
import { ApiUpdateProfileUser } from "../../../api/user/ApiUpdateProfileUser";
import { useAuth } from "../../../context/AuthContext";

function ProfileUser() {
  const useContext = useAuth();

  const userId = useContext.idUser;

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (userId) {
      getProfileUser(userId);
    }
  }, [userId]);

  const getProfileUser = (userId) => {
    ApiGetInforProfileUser(userId)
      .then((response) => {
        const data = response.data;
        setFullName(data.fullName || ""); // null -> ""
        setAddress(data.address || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phoneNumber || "");
      })
      .catch((error) => {
        console.error("Error fetching profile user data:", error);
      });
  };

  const updateProfileUser = (userId, formData) => {
    ApiUpdateProfileUser(userId, formData)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating profile user data:", error);
      });
  };
  return (
    <>
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
                  // onChange={(e) => setFullName(e.target.value)}
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
                  // onChange={(e) => setAddress(e.target.value)}
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
                  // onChange={(e) => setEmail(e.target.value)}
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
                  // onChange={(e) => setPhoneNumber(e.target.value)}
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
