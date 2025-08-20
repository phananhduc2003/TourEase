import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Card,
  FormControl,
  Radio,
  RadioGroup,
  FormGroup,
  Grid,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

function OrderDetailTour() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Box sx={{ width: "80%", display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h3"
          fontWeight={"bold"}
          sx={{ mb: 5, color: "primary.main" }}
        >
          Tổng Quan Về Chuyến Đi
        </Typography>

        <Box
          component="form"
          // onSubmit={handleSubmit}
          method="POST"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{ fontSize: "1.4rem", fontWeight: "500", mb: 3 }}
                >
                  Thông tin liên lạc
                </Typography>

                <Box sx={{ backgroundColor: "background.paper", py: 1, px: 2 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography
                        fontWeight={"bold"}
                        sx={{ fontSize: "0.9rem", mb: 1 }}
                      >
                        Họ và tên
                      </Typography>
                      <TextField
                        // onChange={handlePassword}
                        required
                        fullWidth
                        autoComplete="off"
                        type="text"
                        id="name"
                        name="name"
                        sx={{
                          mb: 3,
                          backgroundColor: "background.default",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography
                        fontWeight={"bold"}
                        sx={{ fontSize: "0.9rem", mb: 1 }}
                      >
                        Email
                      </Typography>
                      <TextField
                        // onChange={handlePassword}
                        required
                        fullWidth
                        autoComplete="off"
                        type="text"
                        id="Email"
                        name="email"
                        sx={{
                          mb: 3,
                          backgroundColor: "background.default",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography
                        fontWeight={"bold"}
                        sx={{ fontSize: "0.9rem", mb: 1 }}
                      >
                        Số điện thoại
                      </Typography>
                      <TextField
                        // onChange={handlePassword}
                        required
                        fullWidth
                        autoComplete="off"
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        sx={{
                          mb: 3,
                          backgroundColor: "background.default",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography
                        fontWeight={"bold"}
                        sx={{ fontSize: "0.9rem", mb: 1 }}
                      >
                        Địa chỉ
                      </Typography>
                      <TextField
                        // onChange={handlePassword}
                        required
                        fullWidth
                        autoComplete="off"
                        type="text"
                        id="address"
                        name="address"
                        sx={{
                          mb: 3,
                          backgroundColor: "background.default",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Typography
                  sx={{ fontSize: "1.4rem", fontWeight: "500", mt: 5, mb: 3 }}
                >
                  Hành Khách
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        border: "1px solid #ccc",
                      }}
                    >
                      <Typography>Người Lớn</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            px: 1,
                            border: 1, // = "1px solid"
                            borderColor: "primary.main",
                            borderRadius: 2,
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          -
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{ mx: 2, color: "primary.main" }}
                        >
                          0
                        </Typography>
                        <Box
                          sx={{
                            px: 1,
                            border: 1, // = "1px solid"
                            borderColor: "primary.main",
                            borderRadius: 2,
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          +
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        border: "1px solid #ccc",
                      }}
                    >
                      <Typography>Trẻ em</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            px: 1,
                            border: 1, // = "1px solid"
                            borderColor: "primary.main",
                            borderRadius: 2,
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          -
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{ mx: 2, color: "primary.main" }}
                        >
                          0
                        </Typography>
                        <Box
                          sx={{
                            px: 1,
                            border: 1, // = "1px solid"
                            borderColor: "primary.main",
                            borderRadius: 2,
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          +
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                    backgroundColor: "background.paper",
                    mt: 5,
                    p: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                    }}
                  >
                    Bằng cách nhấp chuột vào nút "ĐỒNG Ý" dưới đây, Khách hàng
                    đồng ý rằng các Điều kiện điều khoản này sẽ được áp dụng.
                    Vui lòng đọc kỹ Điều kiện điều khoản trước khi lựa chọn sử
                    dụng dịch vụ của Lửa Việt Tours.
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Tôi đã đọc và đồng ý với Điều khoản thanh toán"
                    />
                  </FormGroup>
                </Box>

                <Typography
                  sx={{ fontSize: "1.4rem", fontWeight: "500", mt: 5, mb: 3 }}
                >
                  Phương Thức Thanh Toán
                </Typography>

                <FormControl fullWidth component="fieldset" sx={{ mb: 15 }}>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        mb: 1,
                        boxShadow: "none",
                        border:
                          paymentMethod === "money" ? "3px solid" : "1px solid",
                        borderColor:
                          paymentMethod === "money"
                            ? "primary.main"
                            : "grey.300",
                        cursor: "pointer",
                        backgroundColor:
                          paymentMethod === "money"
                            ? "background.default"
                            : "background.default",
                      }}
                      onClick={() => setPaymentMethod("money")}
                    >
                      <CurrencyRubleIcon
                        sx={{ mr: 1, color: "primary.main" }}
                      />
                      <FormControlLabel
                        value="money"
                        sx={{ ml: 1, color: "text.primary" }}
                        control={<Radio sx={{ display: "none" }} />}
                        label="Thanh toán tại văn phòng"
                      />
                    </Card>

                    {/* Credit/Debit Card */}
                    <Card
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        mb: 1,
                        boxShadow: "none",
                        border:
                          paymentMethod === "card" ? "3px solid" : "1px solid",
                        borderColor:
                          paymentMethod === "card"
                            ? "primary.main"
                            : "grey.300",
                        cursor: "pointer",
                        backgroundColor:
                          paymentMethod === "card"
                            ? "background.default"
                            : "background.default",
                      }}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <PaymentIcon sx={{ mr: 1, color: "primary.main" }} />
                      <FormControlLabel
                        value="card"
                        sx={{ ml: 1, color: "text.primary" }}
                        control={<Radio sx={{ display: "none" }} />}
                        label="Thanh toán bằng Vn Pay"
                      />
                    </Card>

                    {/* Google Pay */}
                    <Card
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        boxShadow: "none",
                        border:
                          paymentMethod === "gPay" ? "3px solid" : "1px solid",
                        borderColor:
                          paymentMethod === "gPay"
                            ? "primary.main"
                            : "grey.300", // hoặc màu border mặc định bạn muốn
                        cursor: "pointer",
                        backgroundColor:
                          paymentMethod === "gPay"
                            ? "background.default"
                            : "background.default",
                      }}
                      onClick={() => setPaymentMethod("gPay")}
                    >
                      <GoogleIcon sx={{ mr: 1, color: "primary.main" }} />
                      <FormControlLabel
                        value="gPay"
                        sx={{ ml: 1, color: "text.primary" }}
                        control={<Radio sx={{ display: "none" }} />}
                        label="Thanh toán bằng Google Pay"
                      />
                    </Card>
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                  boxShadow: 2,
                  backgroundColor: "background.paper",
                }}
              >
                <Typography sx={{ fontSize: "1.2rem", fontWeight: 500, mb: 3 }}>
                  BỜ TÂY HOA KỲ – KẾT HỢP THĂM THÂN 8N7Đ | LOS ANGELES – LAS
                  VEGAS – SAN DIEGO – MEXICO
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "0.5 rem", mb: 2 }}>
                  Ngày khởi hành: 10-01-2025
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "0.5 rem", mb: 3 }}>
                  Ngày kết thúc: 14-01-2025
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.5 rem", mb: 2 }}
                  >
                    Người lớn:
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.5 rem" }}>
                    0 VNĐ
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.5 rem", mb: 2 }}
                  >
                    Trẻ em:
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.5 rem" }}>
                    0 VNĐ
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    fontWeight={"bold"}
                    sx={{ fontSize: "1.4 rem", mb: 2 }}
                  >
                    Tổng Cộng:
                  </Typography>
                  <Typography
                    fontWeight={"bold"}
                    sx={{ fontSize: "1.4 rem", mb: 2 }}
                  >
                    0 VNĐ
                  </Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Box
                        sx={{
                          p: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "1px solid #ccc",

                          borderRadius: 2,
                          width: "100%",
                          height: "60px",
                        }}
                      >
                        Mã giảm giá
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          height: "60px",
                          backgroundColor: "primary.main",
                          borderRadius: 2,
                        }}
                      >
                        Áp dụng
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    height: "50px",
                    backgroundColor: "primary.main",
                  }}
                >
                  Xác Nhận
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default OrderDetailTour;
