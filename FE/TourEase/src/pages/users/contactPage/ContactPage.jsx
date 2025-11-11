import {
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logo from "../../../assets/images/logoweb.png";
import hero from "../../../assets/images/heroimages/hero-pagein4.jpg";
import iconuser1 from "../../../assets/images/imageHome/iconuser1.jpg";
import iconuser2 from "../../../assets/images/imageHome/iconuser2.jpg";
import iconuser3 from "../../../assets/images/imageHome/iconuser3.jpg";
import iconuser4 from "../../../assets/images/imageHome/iconuser4.jpg";
import iconuser5 from "../../../assets/images/imageHome/iconuser5.jpg";
import iconuser6 from "../../../assets/images/imageHome/iconuser6.jpg";

import image1 from "../../../assets/images/imageContact/image1.jpg";
import image2 from "../../../assets/images/imageContact/image2.avif";
import image3 from "../../../assets/images/imageContact/image3.jpg";

import CardInForHomePage from "../../../components/CardInForHomePage/CardInForHomePage";

function ContactPage() {
  const wrapper = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };
  return (
    <>
      <Box sx={wrapper}>
        <Box sx={{ width: "100%", p: 1 }}>
          <Box
            sx={{
              minHeight: "360px",
              width: "100%",
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%), url(${hero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                ml: "300px",
                mb: 3,
                color: "white",
                fontSize: "40px",
                fontWeight: "bold",
                textShadow: "2px 2px 6px rgba(0,0,0,0.7)", // chữ rõ hơn trên ảnh
              }}
            >
              Liên Hệ
            </Box>
          </Box>
        </Box>

        {/* content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: "70%",
              mt: 8,
              backgroundColor: "background.default",
            }}
          >
            <Grid container sx={{ height: "100%" }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ width: "70%" }}>
                  <Typography
                    variant="4"
                    sx={{
                      color: "text.primary",
                      fontWeight: "bold",

                      fontSize: "2.1rem",
                    }}
                  >
                    Hãy Nói Chuyện Với Các Hướng Dẫn Viên Du Lịch Chuyên Nghiệp
                    Của Chúng Tôi
                  </Typography>

                  <Typography sx={{ fontSize: "0.9rem", mt: 2 }}>
                    Đội ngũ hỗ trợ tận tâm của chúng tôi luôn sẵn sàng hỗ trợ
                    bạn giải đáp mọi thắc mắc hoặc vấn đề, cung cấp các giải
                    pháp nhanh chóng và được cá nhân hóa để đáp ứng nhu cầu của
                    bạn.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      boxShadow: 3,

                      mt: 5,
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", my: 2 }}>
                      {" "}
                      85+ Thành viên nhóm chuyên gia
                    </Typography>
                    <Stack direction="row" spacing={-1} mb={1} sx={{}}>
                      <Avatar alt="user1" src={iconuser1} />
                      <Avatar alt="user2" src={iconuser2} />
                      <Avatar alt="user1" src={iconuser3} />
                      <Avatar alt="user2" src={iconuser4} />
                      <Avatar alt="user1" src={iconuser5} />
                      <Avatar alt="user2" src={iconuser6} />

                      <Avatar sx={{ bgcolor: "orange", fontSize: 12 }}>
                        4k+
                      </Avatar>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "background.default",
                  mt: 4,
                }}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{ width: "100%", justifyContent: "center" }}
                >
                  <Grid item xs={12} sm={6} md={6}>
                    <CardInForHomePage
                      title="Cần trợ giúp và hỗ trợ"
                      description="pananhduc2003@gmail.com"
                      icon={MailIcon}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CardInForHomePage
                      title="Cần bất kỳ việc khẩn cấp nào"
                      description="84+ 338288176"
                      icon={PhoneEnabledIcon}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CardInForHomePage
                      title="Hà Nội"
                      description="Mê Linh, Hà Nội, Việt Nam"
                      icon={LocationOnIcon}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CardInForHomePage
                      title="Ký túc xá Việt Hàn"
                      description="470 Trần Đại Nghĩa, Ngũ Hành Sơn, Thành Phố Đà Nẵng"
                      icon={LocationOnIcon}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 15, mb: 20, width: "70%" }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                sx={{ backgroundColor: "background.paper" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    pl: 3,
                    pr: 4,
                  }}
                >
                  <Typography sx={{ fontWeight: 500, fontSize: "2rem" }}>
                    Liên Hệ
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    Địa chỉ email của bạn sẽ không được công bố. Các trường bắt
                    buộc được đánh giấu *
                  </Typography>
                  <Box component="form" method="post" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={6} md={6} sx={{ p: 1 }}>
                            <TextField
                              // onChange={handleUsername}
                              required
                              fullWidth
                              autoComplete="off"
                              id="Username"
                              label="Họ và Tên"
                              name="Username"
                              InputProps={{
                                sx: {
                                  color: "text.primary",
                                  backgroundColor: "background.default",
                                },
                              }}
                              InputLabelProps={{
                                sx: { color: "text.primary" },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: "text.primary",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "text.primary",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "text.primary",
                                  },
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "text.primary",
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} sx={{ p: 1 }}>
                            <TextField
                              // onChange={handleUsername}
                              required
                              fullWidth
                              autoComplete="off"
                              id="phoneNumber"
                              label="Số điện thoại"
                              name="phoneNumber"
                              InputProps={{
                                sx: {
                                  color: "text.primary",
                                  backgroundColor: "background.default",
                                },
                              }}
                              InputLabelProps={{
                                sx: { color: "text.primary" },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: "text.primary",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "text.primary",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "text.primary",
                                  },
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "text.primary",
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} sx={{ p: 1 }}>
                        <TextField
                          // onChange={handleUsername}
                          required
                          fullWidth
                          autoComplete="off"
                          id="email"
                          label="Nhập địa chỉ email"
                          name="email"
                          InputProps={{
                            sx: {
                              color: "text.primary",
                              backgroundColor: "background.default",
                            },
                          }}
                          InputLabelProps={{
                            sx: { color: "text.primary" },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "text.primary",
                              },
                              "&:hover fieldset": {
                                borderColor: "text.primary",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "text.primary",
                              },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                              color: "text.primary",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} sx={{ p: 1 }}>
                        <TextField
                          required
                          fullWidth
                          autoComplete="off"
                          id="content"
                          label="Nội Dung"
                          name="content"
                          multiline
                          minRows={3}
                          maxRows={5}
                          InputProps={{
                            sx: {
                              color: "text.primary",
                              backgroundColor: "background.default",
                              height: "130px ",
                              alignItems: "flex-start",
                              p: 1,
                            },
                          }}
                          InputLabelProps={{
                            sx: { color: "text.primary" },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "text.primary" },
                              "&:hover fieldset": {
                                borderColor: "text.primary",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "text.primary",
                              },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                              color: "text.primary",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
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
                        width: "90px",
                        backgroundColor: "primary.main",
                        mb: 2,
                      }}
                    >
                      Gửi
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                sx={{
                  position: "relative",
                  backgroundColor: "background.default",
                }}
              >
                <Grid container>
                  {/* Ảnh lớn */}
                  <Grid item xs={12} sx={{ p: 3 }}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "200px",
                        backgroundImage: `url(${image1})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: 3,
                        boxShadow: 3,
                      }}
                    ></Box>
                  </Grid>

                  {/* Hai ảnh nhỏ */}
                  <Grid item xs={12} sx={{ px: 3, pb: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "200px",
                            backgroundImage: `url(${image2})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: 3,
                            boxShadow: 3,
                          }}
                        ></Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "200px",
                            backgroundImage: `url(${image3})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: 3,
                            boxShadow: 3,
                          }}
                        ></Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Vòng tròn ở giữa */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    backgroundColor: "white",
                    border: "6px solid ",
                    borderColor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 3,
                    zIndex: 10,
                  }}
                >
                  <img
                    src={logo}
                    alt="Travela logo"
                    style={{ width: 100, height: 100 }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ContactPage;
