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
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import { ApiTourOrderInfo } from "../../../api/user/ApiTourOrderInfo";
import { useParams } from "react-router-dom";
import { ApiCheckout } from "../../../api/user/ApiCheckout";
import { useAuth } from "../../../context/AuthContext";

const vertical = "top";
const horizontal = "right";

function OrderDetailTour() {
  const useContext = useAuth();

  const userId = useContext.idUser;

  const { tourId } = useParams();

  const [paymentMethod, setPaymentMethod] = useState("OFFICE_PAYMENT");

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [messageError, setMessageError] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [contactAddress, setContactAddress] = useState("");

  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [orderInfo, setOrderInfo] = useState([]);

  const [messageSuccess, setMessageSuccess] = useState("");
  const [open, setOpen] = useState(false);

  const priceTotalAdults = orderInfo?.priceAdult
    ? orderInfo.priceAdult * numAdults
    : 0;
  const priceTotalChildren = orderInfo?.priceChild
    ? orderInfo.priceChild * numChildren
    : 0;
  const totalPrice = priceTotalAdults + priceTotalChildren;

  useEffect(() => {
    if (tourId) {
      getApiTourOrderInfo(tourId);
    }
  }, [tourId]);

  const getApiTourOrderInfo = (orderId) => {
    ApiTourOrderInfo(orderId)
      .then((res) => {
        setOrderInfo(res.data);
        console.log("Tour order info:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching tour order info:", err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contactName || !contactEmail || !contactPhone || !contactAddress) {
      alert("Vui lòng điền đầy đủ thông tin liên lạc");
      setMessageSuccess("");
      return;
    }

    if (!agreeToTerms) {
      setMessageError("Vui lòng đồng ý với điều khoản thanh toán");
      setMessageSuccess("");
      setOpen(true);
      return;
    }

    if (!orderInfo?.tourId) {
      alert("Chưa load được thông tin tour. Vui lòng thử lại sau.");
      return;
    }

    const formData = {
      contactName,
      contactEmail,
      contactPhone,
      contactAddress,
      numAdults,
      numChildren,
      specialRequests,
      paymentMethod,
      userId,
      tourId: orderInfo.tourId,
      agreeToTerms,
    };

    const resetForm = () => {
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactAddress("");
      setSpecialRequests("");
      setNumAdults(1);
      setNumChildren(0);
      setAgreeToTerms(false);
      setPaymentMethod("OFFICE_PAYMENT");
    };

    try {
      console.log("Sending checkout data:", formData);

      // Call API checkout
      const response = await ApiCheckout(formData);
      const responseData = response.data; // Thêm dòng này

      if (responseData.success) {
        switch (responseData.paymentStatus) {
          case "PENDING":
            setMessageSuccess(responseData.message);
            setOpen(true);
            setTimeout(() => resetForm(), 3000);
            break;

          case "REDIRECT":
            window.location.href = responseData.redirectUrl;
            break;

          default:
            setMessageSuccess("Checkout thành công!");
            setOpen(true);
            setTimeout(() => resetForm(), 3000);

            break;
        }
      }
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error response:", error.response?.data);

      // Xử lý lỗi
      if (error.response) {
        const errorData = error.response.data;
        setMessageError(
          `Lỗi: ${errorData?.message || "Có lỗi xảy ra khi xử lý thanh toán"}`
        );
        setOpen(true);
      } else if (error.request) {
        setMessageError("Lỗi kết nối. Vui lòng thử lại sau.");
        setOpen(true);
      } else {
        setMessageError(`Có lỗi xảy ra: ${error.message || "Không xác định"}`);
        setOpen(true);
      }
    }
  };

  const handleName = (e) => {
    setContactName(e.target.value);
  };

  const handleEmail = (e) => {
    setContactEmail(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setContactPhone(e.target.value);
  };
  const handleAddress = (e) => {
    setContactAddress(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    setAgreeToTerms(event.target.checked);
  };

  const handleAdultsChange = (increment) => {
    setNumAdults((prev) => Math.max(1, prev + increment));
  };

  const handleChildrenChange = (increment) => {
    setNumChildren((prev) => Math.max(0, prev + increment));
  };

  const formatPrice = (price) => {
    return price?.toLocaleString("vi-VN");
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
        sx={{
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Chỉ hiển thị một thông báo tại một thời điểm */}
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Box sx={{ width: "80%", display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h3"
            fontWeight={"bold"}
            sx={{ mb: 5, color: "primary.main" }}
          >
            Tổng Quan Về Chuyến Đi
          </Typography>

          <Box component="form" onSubmit={handleSubmit} method="POST">
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

                  <Box
                    sx={{ backgroundColor: "background.paper", py: 1, px: 2 }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} md={6}>
                        <Typography
                          fontWeight={"bold"}
                          sx={{ fontSize: "0.9rem", mb: 1 }}
                        >
                          Họ và tên
                        </Typography>
                        <TextField
                          value={contactName}
                          onChange={handleName}
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
                      <Grid item xs={12} sm={12} md={6}>
                        <Typography
                          fontWeight={"bold"}
                          sx={{ fontSize: "0.9rem", mb: 1 }}
                        >
                          Email
                        </Typography>
                        <TextField
                          value={contactEmail}
                          onChange={handleEmail}
                          id="Email"
                          name="contactEmail"
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
                      <Grid item xs={12} sm={12} md={6}>
                        <Typography
                          fontWeight={"bold"}
                          sx={{ fontSize: "0.9rem", mb: 1 }}
                        >
                          Số điện thoại
                        </Typography>
                        <TextField
                          value={contactPhone}
                          onChange={handlePhoneNumber}
                          id="phoneNumber"
                          name="contactPhone"
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
                      <Grid item xs={12} sm={12} md={6}>
                        <Typography
                          fontWeight={"bold"}
                          sx={{ fontSize: "0.9rem", mb: 1 }}
                        >
                          Địa chỉ
                        </Typography>
                        <TextField
                          value={contactAddress}
                          onChange={handleAddress}
                          id="address"
                          name="contactAddress"
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
                            onClick={() => handleAdultsChange(-1)}
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
                            {numAdults}
                          </Typography>
                          <Box
                            onClick={() => handleAdultsChange(1)}
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
                            onClick={() => handleChildrenChange(-1)}
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
                            {numChildren}
                          </Typography>
                          <Box
                            onClick={() => handleChildrenChange(1)}
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
                        control={
                          <Checkbox
                            checked={agreeToTerms}
                            onChange={handleCheckboxChange}
                          />
                        }
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
                            paymentMethod === "OFFICE_PAYMENT"
                              ? "3px solid"
                              : "1px solid",
                          borderColor:
                            paymentMethod === "OFFICE_PAYMENT"
                              ? "primary.main"
                              : "grey.300",
                          cursor: "pointer",
                          backgroundColor:
                            paymentMethod === "OFFICE_PAYMENT"
                              ? "background.default"
                              : "background.default",
                        }}
                        onClick={() => setPaymentMethod("OFFICE_PAYMENT")}
                      >
                        <CurrencyRubleIcon
                          sx={{ mr: 1, color: "primary.main" }}
                        />
                        <FormControlLabel
                          value="OFFICE_PAYMENT"
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
                            paymentMethod === "VNPAY"
                              ? "3px solid"
                              : "1px solid",
                          borderColor:
                            paymentMethod === "VNPAY"
                              ? "primary.main"
                              : "grey.300",
                          cursor: "pointer",
                          backgroundColor:
                            paymentMethod === "VNPAY"
                              ? "background.default"
                              : "background.default",
                        }}
                        onClick={() => setPaymentMethod("VNPAY")}
                      >
                        <PaymentIcon sx={{ mr: 1, color: "primary.main" }} />
                        <FormControlLabel
                          value="VNPAY"
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
                            paymentMethod === "gPay"
                              ? "3px solid"
                              : "1px solid",
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
                        // onClick={() => setPaymentMethod("gPay")}
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
                  <Typography
                    sx={{ fontSize: "1.2rem", fontWeight: 500, mb: 3 }}
                  >
                    {orderInfo.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.5 rem", mb: 2 }}
                  >
                    Ngày khởi hành: {orderInfo.startDate}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.5 rem", mb: 3 }}
                  >
                    Ngày kết thúc: {orderInfo.endDate}
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.5 rem", mb: 2 }}
                    >
                      Người lớn:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.5 rem" }}>
                      {formatPrice(priceTotalAdults)} VND
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.5 rem", mb: 2 }}
                    >
                      Trẻ em:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.5 rem" }}>
                      {formatPrice(priceTotalChildren)} VND
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
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
                      {formatPrice(totalPrice)} VND
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
                    disabled={!agreeToTerms}
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
    </>
  );
}

export default OrderDetailTour;
