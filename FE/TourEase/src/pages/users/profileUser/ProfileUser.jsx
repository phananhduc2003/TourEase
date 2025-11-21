import { Box, Button, Grid, TextField, Typography } from "@mui/material";

function ProfileUser() {
  return (
    <>
      <Box sx={{ width: "100%", height: " 100vh" }}>
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
                  // onChange={handleName}
                  id="contactName"
                  name="contactName"
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
                  // onChange={handleName}
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
                  // onChange={handleName}
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
                  // onChange={handleName}
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
                width: "30%",
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
