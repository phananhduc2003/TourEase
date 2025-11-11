import { Box, Grid, Typography } from "@mui/material";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import hero from "../../../assets/images/heroimages/hero-pagein4.jpg";
import image1 from "../../../assets/images/imageIn4/1.jpg";
import image3 from "../../../assets/images/imageIn4/3.jpg";
import image4 from "../../../assets/images/imageIn4/4.jpg";
import bear from "../../../assets/images/imageIn4/bear.jpg";
import survivorman from "../../../assets/images/imageIn4/survivorman.jpg";

const wrapper = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

const MotionBox = motion(Box);

function IntroductionPage() {
  const navigate = useNavigate();

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const { ref: ref3, inView: inView3 } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const handleChangePage = (path) => {
    navigate(path);
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
              Giới Thiệu
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                mb: 14,
              }}
            >
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2} md={2}>
                    <Box
                      sx={{
                        border: "2px solid",
                        width: "fit-content",
                        borderColor: "primary.main",
                        fontSize: "13px",
                        fontWeight: "bold",
                        color: "text.primary",
                        borderRadius: 25,
                        px: 2.5,
                        py: 0.5,
                        ml: 2,
                      }}
                    >
                      Về chúng tôi
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={2} md={10}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Typography
                        sx={{
                          width: "60%",
                          color: "text.primary",
                          fontWeight: "500",
                          fontSize: "34px",
                        }}
                      >
                        Kinh Nghiệm Và Công Ty Du Lịch Chuyên Nghiệp Ở Việt Nam
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 4,
                  width: "100%",
                }}
              >
                <Box sx={{ width: "80%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={3}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 130,
                          height: 130,
                          backgroundColor: "background.paper",
                          borderRadius: 50,
                        }}
                      >
                        <Typography variant="span" sx={{ fontSize: "0.8rem" }}>
                          Chúng tôi có
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: "2.5rem" }}
                        >
                          5+
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "text.primary",
                            fontSize: "0.9rem",
                            lineHeight: "1.8",
                          }}
                        >
                          Chúng tôi chuyên tạo ra những trải nghiệm thành phố
                          khó quên cho du khách muốn khám phá trái tim và tâm
                          hồn của cảnh quan đô thị. Các tour du lịch có hướng
                          dẫn viên chuyên nghiệp của chúng tôi sẽ đưa du khách
                          qua những con phố sôi động, các địa danh lịch sử và
                          những viên ngọc ẩn giấu của mỗi thành phố.
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 4,
                          }}
                        >
                          <Grid container spacing={2} sx={{ maxWidth: "80%" }}>
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <CheckCircleIcon
                                  sx={{
                                    color: "primary.main",
                                    fontSize: "20px",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "text.primary",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  Cở quan trải nghiệm
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <CheckCircleIcon
                                  sx={{
                                    color: "primary.main",
                                    fontSize: "20px",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "text.primary",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  Đội ngũ Chuyên nghiệp
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <CheckCircleIcon
                                  sx={{
                                    color: "primary.main",
                                    fontSize: "20px",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "text.primary",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  Du lịch chi phí thấp
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <CheckCircleIcon
                                  sx={{
                                    color: "primary.main",
                                    fontSize: "20px",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "text.primary",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  Hỗ trợ trực tuyến 24/7
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box
                          onClick={() => handleChangePage("/tours")}
                          sx={{
                            display: "flex",
                            border: "2px solid",
                            width: "fit-content",
                            borderColor: "text.primary",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "text.primary",
                            borderRadius: 25,
                            px: 2.5,
                            py: 1.5,
                            ml: 2,
                            mt: 4,
                            cursor: "pointer",
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.05)", // phóng to nhẹ khi hover
                            },
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.primary",
                              fontWeight: "bold",
                              fontSize: "14px",
                            }}
                          >
                            Khám Phá Tours
                          </Typography>
                          <ArrowForwardIcon
                            sx={{
                              color: "primary.main",
                              fontSize: "20px",
                              ml: 1,
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>

            <MotionBox
              ref={ref}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              sx={{ mb: 14 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "360px",
                      backgroundImage: `url(${image1})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: 3,
                      boxShadow: 3,
                    }}
                  ></Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "360px",
                      backgroundImage: `url(${image4})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: 3,
                      boxShadow: 3,
                    }}
                  ></Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Grid container direction={"column"} spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "172px",
                          backgroundColor: "primary.dark",
                          borderRadius: 3,
                          boxShadow: 3,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          textAlign: "center",
                          p: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                            position: "relative",
                          }}
                        >
                          <EmojiEventsIcon
                            sx={{
                              color: "#E4E4E4",
                              fontSize: "2rem",
                              position: "absolute",
                              top: 0,
                            }}
                          />{" "}
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bold",
                              color: "text.primary",
                              ml: 5,
                            }}
                          >
                            Chúng tôi là công ty đạt giải thưởng
                          </Typography>
                        </Box>
                        {/* Mô tả */}
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.9rem",
                            color: "text.primary",
                          }}
                        >
                          Tại Pinnacle Business Solutions cam kết về sự xuất sắc
                          và đổi mới để đạt được.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "172px",
                          backgroundColor: "primary.contrastText",
                          borderRadius: 3,
                          boxShadow: 3,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          p: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                            position: "relative",
                          }}
                        >
                          <TravelExploreIcon
                            sx={{
                              color: "#E4E4E4",
                              fontSize: "2rem",
                              position: "absolute",
                              top: 0,
                            }}
                          />{" "}
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bold",
                              color: "text.primary",
                              ml: 5,
                            }}
                          >
                            5000+ Điểm đến du lịch phổ biến
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.9rem",
                            color: "text.primary",
                          }}
                        >
                          Đội ngũ chuyên gia của chúng tôi tận tâm phát triển
                          các chiến lược tiên tiến thúc đẩy thành công.
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MotionBox>

            <MotionBox
              ref={ref2}
              initial={{ opacity: 0, x: 100 }} // trượt từ phải sang
              animate={inView2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }} // chậm hơn 1 chút
              sx={{ mb: 10 }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
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
                      color: "text.primary",
                      fontWeight: "bold",
                    }}
                  >
                    Du Lịch Với Sự Tự Tin Lý Do Hàng Đầu Để Chọn Công Ty Của
                    Chúng Tôi
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.primary",

                      mb: 2,
                    }}
                  >
                    Chúng tôi hợp tác chặt chẽ với khách hàng để hiểu rõ những
                    thách thức và mục tiêu, cung cấp các giải pháp sáng tạo,
                    chính xác nâng cao hiệu quả, tăng lợi nhuận và thúc đẩy tăng
                    trưởng bền vững.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="h3"
                        sx={{ fontWeight: "bold", color: "text.primary" }}
                      >
                        1K+
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem", color: "text.primary" }}
                      >
                        Điểm đến phổ biến
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="h3"
                        sx={{ fontWeight: "bold", color: "text.primary" }}
                      >
                        8m+
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem", color: "text.primary" }}
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

                      textAlign: "center",
                      color: "text.second",
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)", // phóng to nhẹ khi hover
                      },
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
                <Grid item xs={12} sm={12} md={8}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "360px",
                      backgroundImage: `url(${image3})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: 3,
                      boxShadow: 3,
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </MotionBox>

            <Box
              sx={{
                mb: 6,
                textAlign: "center",
                backgroundColor: "background.default",
              }}
            >
              <Typography
                sx={{
                  color: "text.primary",
                  fontWeight: "500",
                  fontSize: "1.8rem",
                  mb: 1,
                }}
              >
                Gặp Gỡ Những Hướng Dẫn Viên Du Lịch Giàu Kinh Nghiệm Của Chúng
                Tôi
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  px: 1,
                  borderRadius: 10,
                  backgroundColor: "background.default",
                  color: "text.primary",
                  fontSize: "0.9rem",
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
                  34500+
                </Box>{" "}
                trải nghiệm phổ biến nhất
              </Typography>
            </Box>

            <MotionBox
              ref={ref3}
              initial={{ opacity: 0, y: 100 }} // trượt từ phải sang
              animate={inView3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              sx={{ mb: 10 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "200px",
                    height: "230px",
                    backgroundImage: `url(${bear})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 2,
                    boxShadow: 3,
                    mr: 1,
                  }}
                ></Box>
                <Box
                  sx={{
                    width: "200px",
                    height: "230px",
                    backgroundImage: `url(${survivorman})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 2,
                    boxShadow: 3,
                    ml: 1,
                  }}
                ></Box>
              </Box>
            </MotionBox>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default IntroductionPage;
