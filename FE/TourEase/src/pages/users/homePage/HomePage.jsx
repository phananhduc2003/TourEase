import { Avatar, Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HomeIcon from "@mui/icons-material/Home";

import hero1 from "../../../assets/images/heroimages/hero1.jpg";
import hero2 from "../../../assets/images/heroimages/hero2.jpg";
import hero3 from "../../../assets/images/heroimages/hero3.jpg";
import hero4 from "../../../assets/images/heroimages/hero4.jpg";
import hero5 from "../../../assets/images/heroimages/hero5.jpg";
import hero6 from "../../../assets/images/heroimages/hero6.jpg";
import about from "../../../assets/images/imageHome/about.png";
import iconuser1 from "../../../assets/images/imageHome/iconuser1.jpg";
import iconuser2 from "../../../assets/images/imageHome/iconuser2.jpg";
import cta1 from "../../../assets/images/imageHome/cta1.jpg";
import cta2 from "../../../assets/images/imageHome/cta2.jpg";
import cta3 from "../../../assets/images/imageHome/cta3.jpg";
import featuresBox from "../../../assets/images/imageHome/features-box.jpg";

import CardInForHomePage from "../../../components/CardInForHomePage/CardInForHomePage";
import TourCard from "../../../components/TourCard/TourCard";
import CardPopularTour from "../../../components/CardPopularTour/CardPopularTour";
import { useNavigate } from "react-router-dom";

const wrapper = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

const MotionBox = motion(Box);

function HomePage() {
  const navigate = useNavigate();

  const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6];

  const { ref, inView } = useInView({
    triggerOnce: false, // ✅ cho phép chạy lại animation nhiều lần
    threshold: 0.1,
  });

  const handleNavigateToTour = (tourId) => {
    navigate(`/tour-detail/${tourId}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Box sx={wrapper}>
        {/* hero image */}
        <Box sx={wrapper}>
          {/* hero image */}
          <Box
            sx={{
              m: 3,
              borderRadius: 1,
              boxShadow: 3,
              position: "relative", // Đặt relative để chứa các thành phần con tuyệt đối
            }}
          >
            {/* Dòng chữ "Tour Ease" */}
            <Typography
              sx={{
                position: "absolute",
                top: "15%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "primary.main",
                fontSize: "clamp(2rem, 8vw, 10rem)",
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                zIndex: 10,
              }}
            >
              Tour Ease
            </Typography>

            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              style={{ width: "100%", height: "100vh", overflow: "hidden" }}
            >
              {heroImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <Box
                    style={{
                      height: "100vh",
                      width: "100%",
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
        {/* welcome message */}
        <Box sx={{ textAlign: "center", mt: 6, mb: 4 }}>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.primary",
              fontWeight: "bold",
              fontSize: "3.5rem",
            }}
          >
            Khám Phá Kho Báu Việt Nam Cùng TourEase
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.primary",
              marginTop: 1,
              fontSize: "1.3rem",
            }}
          >
            Website đặt tour du lịch trực tuyến hàng đầu tại Việt Nam
          </Typography>
        </Box>

        {/* card information tour */}
        <TourCard onclickChangePage={handleNavigateToTour} />

        {/* title and description */}

        <Box
          sx={{
            mt: 6,
            minHeight: "100vh",
            width: "100%",
            backgroundColor: "background.second",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: "60%",
              height: "70%",
              width: "100%",
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
                <Typography
                  variant="h4"
                  sx={{
                    mb: 2,
                    color: "text.second",
                    fontWeight: "bold",
                    width: "70%",
                  }}
                >
                  Du Lịch Với Sự Tự Tin Lý Do Hàng Đầu Để Chọn Công Ty Chúng Tôi
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.second",
                    width: "70%",
                    mb: 2,
                    fontSize: "0.8rem",
                  }}
                >
                  Chúng tôi sẽ nỗ lực hết mình để biến giấc mơ du lịch của bạn
                  thành hiện thực những viên ngọc ẩn và những điểm tham quan
                  không thể bỏ qua.
                </Typography>

                <Box
                  sx={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    my: 3,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1,
                      borderRadius: 10,
                      backgroundColor: "background.default",
                      color: "text.primary",
                    }}
                  >
                    Chúng tôi có{" "}
                    <Box
                      component="span"
                      sx={{
                        backgroundColor: "primary.main",
                        color: "text.primary",
                        px: 0.5,
                        borderRadius: 10,
                      }}
                    >
                      5+ năm
                    </Box>{" "}
                    kinh nghiệm
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "space-between",
                    my: 3,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: "bold", color: "text.second" }}
                    >
                      1K+
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.7rem", color: "text.second" }}
                    >
                      Điểm đến phổ biến
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: "bold", color: "text.second" }}
                    >
                      8m+
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.7rem", color: "text.second" }}
                    >
                      Khách hàng hài lòng
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "70%",
                    backgroundColor: "primary.main",
                    borderRadius: 10,
                    p: 1,
                    cursor: "pointer",
                    textAlign: "center",
                    color: "text.second",
                  }}
                >
                  <Box sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                    Khám Phá Điểm Đến
                  </Box>
                  <ArrowOutwardIcon
                    sx={{
                      fontSize: "1.1rem",
                      ml: 1,
                    }}
                  />
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
                  backgroundColor: "background.second",
                }}
              >
                <Box
                  sx={{
                    mt: 2,
                    width: "300px",
                    height: "350px",
                    backgroundImage: `url(${about})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* tour popular */}
        <Box
          sx={{
            mt: 8,
            mb: 6,
            textAlign: "center",
            backgroundColor: "background.default",
          }}
        >
          <Typography
            sx={{
              color: "text.primary",
              fontWeight: "bold",
              mb: 1,
              fontSize: "3.5rem",
            }}
          >
            Khám Phá Các Điểm Đến Phổ Biến
          </Typography>
          <Typography
            variant="caption"
            sx={{
              px: 1,
              borderRadius: 10,
              backgroundColor: "background.default",
              color: "text.primary",
              fontSize: "1.3rem",
            }}
          >
            Website{" "}
            <Box
              component="span"
              sx={{
                backgroundColor: "primary.main",
                color: "text.primary",
                px: 0.5,
                borderRadius: 10,
              }}
            >
              24080+
            </Box>{" "}
            trải nghiệm phổ biến nhất
          </Typography>

          <CardPopularTour onclickChangePage={handleNavigateToTour} />
        </Box>
        {/* about website */}
        <MotionBox
          ref={ref}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box
            sx={{
              mt: 6,
              minHeight: "70vh",
              width: "100%",
              backgroundColor: "background.default",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                height: "70%",
                width: "100%",
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
                  <Typography
                    variant="4"
                    sx={{
                      color: "text.primary",
                      fontWeight: "bold",
                      width: "80%",
                      fontSize: "1.8rem",
                    }}
                  >
                    Trải Nhiệm Du Lịch Tuyệt Đỉnh Mang Đến Sự Khác Biệt Cho Công
                    Ty Chúng Tôi
                  </Typography>
                  <Box
                    sx={{
                      mt: 4,
                      mb: 3,
                      position: "relative",
                      width: "90%",
                      height: "auto",
                      bgcolor: "white",
                      borderRadius: 2,
                      p: 2,
                      boxShadow: 3,
                      display: "flex",
                      alignItems: "center",
                      overflow: "visible", // Cho phép phần ảnh trồi ra
                      backgroundColor: "background.paper",
                      transition: "transform 0.3s ease-in-out", // hiệu ứng mượt
                      "&:hover": {
                        transform: "scale(1.05)", // phóng to nhẹ khi hover
                        boxShadow: 4, // thêm đổ bóng nếu muốn
                        cursor: "pointer", // đổi con trỏ chuột
                      },
                    }}
                  >
                    {/* Ảnh bên trái, trồi ra ngoài box */}
                    <Box
                      component="img"
                      src={featuresBox}
                      alt="couple"
                      sx={{
                        width: 150,
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 2,
                        position: "absolute",
                        left: -60, // đẩy ảnh ra ngoài box
                        top: "50%",
                        transform: "translateY(-50%)",
                        boxShadow: 2,
                      }}
                    />

                    {/* Nội dung bên phải */}
                    <Box
                      sx={{
                        marginLeft: 15,
                      }}
                    >
                      <Stack direction="row" spacing={-1} mb={1}>
                        <Avatar alt="user1" src={iconuser1} />
                        <Avatar alt="user2" src={iconuser2} />

                        <Avatar sx={{ bgcolor: "orange", fontSize: 12 }}>
                          4k+
                        </Avatar>
                      </Stack>
                      <Typography
                        variant="Subtitle 2"
                        fontWeight="bold"
                        sx={{
                          color: "text.primary",
                        }}
                      >
                        850K+ Khách hàng hài lòng
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Chip
                          label="5+ Năm"
                          size="small"
                          sx={{
                            mt: 3,
                            mb: 3,
                            backgroundColor: "primary.main",
                            color: "text.primary",
                          }}
                        />
                      </Box>
                      <Typography variant="body2">
                        Chúng tôi tự hào cung cấp các hành trình được cá nhân
                        hóa
                      </Typography>
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
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Box>
                        <CardInForHomePage
                          title="Chinh Phục Cảnh Quan Việt Nam"
                          description="Khám phá những cảnh đẹp hùng vĩ và tuyệt vời của đất nước Việt Nam"
                          icon={HomeIcon}
                        />
                      </Box>
                      <Box sx={{ mt: 3 }}>
                        <CardInForHomePage
                          title="Chinh Phục Cảnh Quan Việt Nam"
                          description="Khám phá những cảnh đẹp hùng vĩ và tuyệt vời của đất nước Việt Nam"
                          icon={HomeIcon}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", mt: 2 }}
                    >
                      <Box>
                        <CardInForHomePage
                          title="Chinh Phục Cảnh Quan Việt Nam"
                          description="Khám phá những cảnh đẹp hùng vĩ và tuyệt vời của đất nước Việt Nam"
                          icon={HomeIcon}
                        />
                      </Box>
                      <Box sx={{ mt: 3 }}>
                        <CardInForHomePage
                          title="Chinh Phục Cảnh Quan Việt Nam"
                          description="Khám phá những cảnh đẹp hùng vĩ và tuyệt vời của đất nước Việt Nam"
                          icon={HomeIcon}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </MotionBox>

        <Box sx={{ mt: 1, mb: 5 }}>
          <Grid container spacing={2} sx={{ px: 3 }}>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ width: "200px", height: "250px" }}
            >
              <Box
                sx={{
                  width: "100",
                  height: "100%",
                  backgroundImage: `url(${cta1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ fontSize: "0.7rem", mt: 3, color: "#f5f5f5" }}
                  >
                    Khám Phá Vẻ Đẹp Văn Hóa Việt
                  </Typography>
                  <Typography
                    sx={{
                      color: "#f5f5f5",
                      width: "60%",
                      height: "130px",
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                    }}
                  >
                    Tìm hiểu những giá trị văn hóa đọc đáo của các vùng miền
                    Việt Nam
                  </Typography>
                  <Box
                    sx={{
                      width: "fit-content",
                      backgroundColor: "primary.main",
                      borderRadius: 25,
                      px: 2,
                      py: 0.5,
                      fontSize: "1rem",
                      mt: 1,
                    }}
                  >
                    Khám Phá
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ width: "200px", height: "250px" }}
            >
              <Box
                sx={{
                  width: "100",
                  height: "100%",
                  backgroundImage: `url(${cta2})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ fontSize: "0.7rem", mt: 3, color: "#f5f5f5" }}
                  >
                    Bãi biển Sea
                  </Typography>
                  <Typography
                    sx={{
                      color: "#f5f5f5",
                      width: "60%",
                      height: "130px",
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                    }}
                  >
                    Bãi Trong Xanh dạt dào ở Việt Nam
                  </Typography>
                  <Box
                    sx={{
                      width: "fit-content",
                      backgroundColor: "primary.main",
                      borderRadius: 25,
                      px: 2,
                      py: 0.5,
                      fontSize: "1rem",
                      mt: 1,
                    }}
                  >
                    Khám Phá
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ width: "200px", height: "250px" }}
            >
              <Box
                sx={{
                  width: "100",
                  height: "100%",
                  backgroundImage: `url(${cta3})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ fontSize: "0.7rem", mt: 3, color: "#f5f5f5" }}
                  >
                    Thác nước
                  </Typography>
                  <Typography
                    sx={{
                      color: "#f5f5f5",
                      width: "60%",
                      height: "130px",
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                    }}
                  >
                    Thác nước lớn nhất Việt Nam
                  </Typography>
                  <Box
                    sx={{
                      width: "fit-content",
                      backgroundColor: "primary.main",
                      borderRadius: 25,
                      px: 2,
                      py: 0.5,
                      fontSize: "1rem",
                      mt: 1,
                    }}
                  >
                    Khám Phá
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
