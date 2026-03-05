import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Grid,
  MenuItem,
  IconButton,
  Chip,
  FormControlLabel,
  Switch,
  InputAdornment,
  Divider,
  CircularProgress,
  Card,
  CardMedia,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate, useParams } from "react-router-dom";
import { ApiGetTourDetail } from "../../../../api/admin/ApiGetTourDetail";
import { ApiCreateTour } from "../../../../api/admin/ApiCreateTour";
import { ApiUpdateTour } from "../../../../api/admin/ApiUpdateTour";

const DESTINATIONS = ["Miền Bắc", "Miền Trung", "Miền Nam"];

const DEPARTURE_LOCATIONS = ["TP. Hồ Chí Minh", "Hà Nội"];

const TRANSPORTATION_OPTIONS = ["Máy bay", "Xe khách"];

function RetrieveTours() {
  const { status } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tourCode: "",
    quantity: "",
    priceAdult: "",
    priceChild: "",
    duration: "",
    destination: "",
    departureLocation: "",
    transportation: "",
    availability: true,
    startDates: [],
    images: [],
    itineraryDays: [],
  });

  const [newStartDate, setNewStartDate] = useState("");
  const [errors, setErrors] = useState({});
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newItinerary, setNewItinerary] = useState({
    dayNumber: "",
    title: "",
  });

  useEffect(() => {
    handleGetTourInfo();
  }, [status]);

  const handleGetTourInfo = () => {
    if (status != -1) {
      setLoading(true);
      ApiGetTourDetail(status)
        .then((response) => {
          const data = response.data;
          setFormData({
            title: data.title || "",
            description: data.description || "",
            tourCode: data.tourCode || "",
            quantity: data.quantity || "",
            priceAdult: data.priceAdult || "",
            priceChild: data.priceChild || "",
            duration: data.duration || "",
            destination: data.destination || "",
            departureLocation: data.departureLocation || "",
            transportation: data.transportation || "",
            availability: data.availability === 1 || data.availability === true,
            startDates: data.startDates
              ? data.startDates.map((d) =>
                  typeof d === "string" ? d : d.startDate,
                )
              : [],
            images: data.images || [],
            itineraryDays: data.itineraryDays || [],
          });
        })
        .catch((error) => {
          console.error("Error fetching tour detail:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddStartDate = () => {
    if (!newStartDate) {
      setErrors((prev) => ({
        ...prev,
        startDates: "Vui lòng chọn ngày khởi hành",
      }));
      return;
    }

    if (formData.startDates.includes(newStartDate)) {
      setErrors((prev) => ({
        ...prev,
        startDates: "Ngày này đã tồn tại",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      startDates: [...prev.startDates, newStartDate].sort(),
    }));
    setNewStartDate("");
    setErrors((prev) => ({ ...prev, startDates: "" }));
  };

  const handleRemoveStartDate = (dateToRemove) => {
    setFormData((prev) => ({
      ...prev,
      startDates: prev.startDates.filter((date) => date !== dateToRemove),
    }));
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setFormData((prev) => ({ ...prev, images: [...prev.images, newImageUrl] }));
    setNewImageUrl("");
  };
  const handleRemoveImage = (img) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((i) => i !== img),
    }));
  };

  // Itinerary
  const handleAddItinerary = () => {
    const dayNum = parseInt(newItinerary.dayNumber);
    setFormData((prev) => ({
      ...prev,
      itineraryDays: [
        ...prev.itineraryDays,
        { dayNumber: dayNum, title: newItinerary.title },
      ].sort((a, b) => a.dayNumber - b.dayNumber),
    }));
    setNewItinerary({ dayNumber: "", title: "" });
  };
  const handleRemoveItinerary = (dayNum) => {
    setFormData((prev) => ({
      ...prev,
      itineraryDays: prev.itineraryDays.filter((d) => d.dayNumber !== dayNum),
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Vui lòng nhập tên tour";
    if (!formData.description.trim())
      newErrors.description = "Vui lòng nhập mô tả";
    if (!formData.tourCode.trim()) newErrors.tourCode = "Vui lòng nhập mã tour";
    if (!formData.quantity || formData.quantity <= 0)
      newErrors.quantity = "Số lượng phải lớn hơn 0";
    if (!formData.priceAdult || formData.priceAdult <= 0)
      newErrors.priceAdult = "Giá người lớn phải lớn hơn 0";
    if (!formData.priceChild || formData.priceChild <= 0)
      newErrors.priceChild = "Giá trẻ em phải lớn hơn 0";
    if (!formData.duration.trim())
      newErrors.duration = "Vui lòng nhập thời gian";
    if (!formData.destination) newErrors.destination = "Vui lòng chọn điểm đến";
    if (!formData.departureLocation)
      newErrors.departureLocation = "Vui lòng chọn điểm khởi hành";
    if (!formData.transportation)
      newErrors.transportation = "Vui lòng chọn phương tiện";
    if (formData.startDates.length === 0)
      newErrors.startDates = "Vui lòng thêm ít nhất 1 ngày khởi hành";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const submitData = {
      title: formData.title,
      description: formData.description,
      tourCode: formData.tourCode,
      quantity: parseInt(formData.quantity, 10),
      priceAdult: parseFloat(formData.priceAdult),
      priceChild: parseFloat(formData.priceChild),
      duration: formData.duration,
      destination: formData.destination,
      departureLocation: formData.departureLocation,
      transportation: formData.transportation,
      availability: formData.availability ? 1 : 0,
      startDates: formData.startDates.map((d) =>
        typeof d === "string" ? d : d.startDate,
      ),
      images: formData.images || [],
      itineraryDays: (formData.itineraryDays || []).map((d) => ({
        dayNumber: d.dayNumber,
        title: d.title,
      })),
    };

    setLoading(true);

    if (status == -1) {
      // Add new tour
      ApiCreateTour(submitData)
        .then((response) => {
          console.log("Tour added successfully:", response.data);
          navigate("/manage-tours", {
            state: { successMessage: "Tạo tour mới thành công!" },
          });
        })
        .catch((error) => {
          console.error("Error adding tour:", error);
          alert("Không thể thêm tour. Vui lòng thử lại.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Update existing tour
      ApiUpdateTour(status, submitData)
        .then(() => {
          console.log("Tour updated successfully");
          navigate("/manage-tours", {
            state: { successMessage: "Cập nhật tour thành công!" },
          });
        })
        .catch((error) => {
          console.error("Error updating tour:", error);
          alert("Không thể cập nhật tour. Vui lòng thử lại.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleCancel = () => {
    navigate("/manage-tours");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  if (loading && status != -1) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "background.default",
        minHeight: "100%",
      }}
    >
      <Paper
        sx={{
          p: 3,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={handleCancel}
              sx={{
                color: "text.secondary",
                "&:hover": { backgroundColor: "action.hover" },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {status == -1 ? "Thêm Tour Mới" : "Chỉnh Sửa Tour"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Tên Tour */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên Tour *"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>

            {/* Mô tả */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả *"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>

            {/* Mã Tour & Số lượng */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mã Tour *"
                value={formData.tourCode}
                onChange={(e) => handleChange("tourCode", e.target.value)}
                error={!!errors.tourCode}
                helperText={errors.tourCode}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Số lượng *"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                error={!!errors.quantity}
                helperText={errors.quantity}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>

            {/* Giá người lớn & Giá trẻ em */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Giá người lớn *"
                type="number"
                value={formData.priceAdult}
                onChange={(e) => handleChange("priceAdult", e.target.value)}
                error={!!errors.priceAdult}
                helperText={errors.priceAdult}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">VNĐ</InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Giá trẻ em *"
                type="number"
                value={formData.priceChild}
                onChange={(e) => handleChange("priceChild", e.target.value)}
                error={!!errors.priceChild}
                helperText={errors.priceChild}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">VNĐ</InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>

            {/* Thời gian */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Thời gian *"
                placeholder="VD: 6N5D, 3 ngày 2 đêm"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                error={!!errors.duration}
                helperText={errors.duration}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>

            {/* Điểm đến */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Điểm đến *"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                error={!!errors.destination}
                helperText={errors.destination}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              >
                {DESTINATIONS.map((dest) => (
                  <MenuItem key={dest} value={dest}>
                    {dest}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Điểm khởi hành */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Điểm khởi hành *"
                value={formData.departureLocation}
                onChange={(e) =>
                  handleChange("departureLocation", e.target.value)
                }
                error={!!errors.departureLocation}
                helperText={errors.departureLocation}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              >
                {DEPARTURE_LOCATIONS.map((loc) => (
                  <MenuItem key={loc} value={loc}>
                    {loc}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Phương tiện */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Phương tiện *"
                value={formData.transportation}
                onChange={(e) => handleChange("transportation", e.target.value)}
                error={!!errors.transportation}
                helperText={errors.transportation}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              >
                {TRANSPORTATION_OPTIONS.map((trans) => (
                  <MenuItem key={trans} value={trans}>
                    {trans}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Trạng thái */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.availability}
                    onChange={(e) =>
                      handleChange("availability", e.target.checked)
                    }
                    color="success"
                  />
                }
                label={
                  <Typography sx={{ fontWeight: "600", color: "text.primary" }}>
                    {formData.availability ? "Còn chỗ" : "Hết chỗ"}
                  </Typography>
                }
              />
            </Grid>

            {/* Ngày khởi hành */}
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
              >
                Ngày khởi hành *
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 2,
                  alignItems: "flex-start",
                }}
              >
                <TextField
                  type="date"
                  label="Chọn ngày"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "background.default",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  onClick={handleAddStartDate}
                  type="button"
                  sx={{
                    height: "56px",
                    px: 3,
                    color: "text.primary",
                    backgroundColor: "primary.main",
                    "&:hover": { backgroundColor: "primary.dark" },
                  }}
                >
                  Thêm
                </Button>
              </Box>

              {errors.startDates && (
                <Typography color="error" sx={{ fontSize: "12px", mb: 1 }}>
                  {errors.startDates}
                </Typography>
              )}

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {formData.startDates.map((date, index) => (
                  <Chip
                    key={index}
                    icon={<CalendarTodayIcon sx={{ fontSize: "16px" }} />}
                    label={formatDate(date)}
                    onDelete={() => handleRemoveStartDate(date)}
                    deleteIcon={<DeleteIcon />}
                    sx={{
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#1e3a5f" : "#e3f2fd",
                      color:
                        theme.palette.mode === "dark" ? "#60a5fa" : "#1565c0",
                      fontWeight: "600",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid #1e40af"
                          : "1px solid #90caf9",
                      "& .MuiChip-deleteIcon": {
                        color:
                          theme.palette.mode === "dark" ? "#f87171" : "#d32f2f",
                        "&:hover": {
                          color:
                            theme.palette.mode === "dark"
                              ? "#ef4444"
                              : "#b71c1c",
                        },
                      },
                    }}
                  />
                ))}
              </Box>

              {formData.startDates.length === 0 && (
                <Typography
                  sx={{
                    mt: 2,
                    fontSize: "14px",
                    color: "text.secondary",
                    fontStyle: "italic",
                  }}
                >
                  Chưa có ngày khởi hành nào
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
              >
                🖼️ Hình ảnh
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="URL hình ảnh"
                  placeholder="https://example.com/image.jpg"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "background.default",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  onClick={handleAddImage}
                  type="button"
                  sx={{
                    height: "56px",
                    px: 3,
                    whiteSpace: "nowrap",
                    color: "text.primary",
                    backgroundColor: "primary.main",
                  }}
                >
                  Thêm
                </Button>
              </Box>

              {formData.images.length > 0 ? (
                <Grid container spacing={2}>
                  {formData.images.map((img, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Card
                        sx={{
                          position: "relative",
                          borderRadius: 2,
                          overflow: "hidden",
                          "&:hover .delete-overlay": {
                            opacity: 1,
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={img}
                          alt={`Image ${idx + 1}`}
                          sx={{ objectFit: "cover" }}
                        />

                        <Box
                          className="delete-overlay"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          }}
                        >
                          <IconButton
                            onClick={() => handleRemoveImage(img)}
                            sx={{
                              backgroundColor: "error.main",
                              color: "white",
                              width: "56px",
                              height: "56px",
                              "&:hover": {
                                backgroundColor: "error.dark",
                                transform: "scale(1.1)",
                              },
                              transition: "all 0.2s ease",
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: "28px" }} />
                          </IconButton>
                        </Box>

                        <Chip
                          label={`#${idx + 1}`}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box
                  sx={{
                    p: 4,
                    textAlign: "center",
                    backgroundColor: "background.default",
                    borderRadius: 2,
                    border: `2px dashed ${theme.palette.divider}`,
                  }}
                >
                  <Typography
                    sx={{ color: "text.secondary", fontStyle: "italic" }}
                  >
                    Chưa có hình ảnh nào. Thêm URL hình ảnh ở trên.
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                🗺️ Lịch trình
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  type="number"
                  label="Ngày"
                  sx={{ width: "100px" }}
                  value={newItinerary.dayNumber}
                  onChange={(e) =>
                    setNewItinerary({
                      ...newItinerary,
                      dayNumber: e.target.value,
                    })
                  }
                />
                <TextField
                  fullWidth
                  label="Tiêu đề"
                  value={newItinerary.title}
                  onChange={(e) =>
                    setNewItinerary({ ...newItinerary, title: e.target.value })
                  }
                />
                <Button
                  startIcon={<AddCircleIcon />}
                  onClick={handleAddItinerary}
                  sx={{
                    height: "56px",
                    px: 3,
                    whiteSpace: "nowrap",
                    color: "text.primary",
                    backgroundColor: "primary.main",
                  }}
                >
                  Thêm
                </Button>
              </Box>

              {formData.itineraryDays.map((day) => (
                <Box
                  key={day.dayNumber}
                  sx={{
                    p: 2,
                    mb: 1,
                    backgroundColor: "background.default",
                    borderRadius: 1,
                  }}
                >
                  <Chip
                    label={`Ngày ${day.dayNumber}`}
                    sx={{
                      color: "text.primary",
                      backgroundColor: "primary.main",
                    }}
                  />
                  <Typography>{day.title}</Typography>
                  <IconButton
                    onClick={() => handleRemoveItinerary(day.dayNumber)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 4 }}
          >
            <Button
              variant="outlined"
              onClick={handleCancel}
              type="button"
              disabled={loading}
              sx={{
                px: 4,
                py: 1,
                textTransform: "none",
                fontWeight: "600",
              }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              startIcon={
                loading ? <CircularProgress size={20} /> : <SaveIcon />
              }
              type="submit"
              disabled={loading}
              sx={{
                px: 4,
                py: 1,
                textTransform: "none",
                color: "text.primary",
                fontWeight: "600",
                backgroundColor: "success.main",
                "&:hover": { backgroundColor: "success.dark" },
              }}
            >
              {loading
                ? "Đang xử lý..."
                : status == -1
                  ? "Tạo mới"
                  : "Cập nhật"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default RetrieveTours;
