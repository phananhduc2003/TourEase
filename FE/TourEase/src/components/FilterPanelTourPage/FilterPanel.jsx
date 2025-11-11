import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Radio,
  Rating,
  FormGroup,
  Slider,
  Typography,
} from "@mui/material";

function FilterPanel({
  priceRange,
  onPriceChange,
  onPriceCommit,
  destinations,
  selectedDestinations,
  onDestinationChange,
  onClearFilters,
}) {
  const formatPrice = (value) => `${value} triệu`;

  return (
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "background.paper",
        boxShadow: 3,
      }}
    >
      <Box sx={{ mx: 2, mt: 3, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={onClearFilters}
          >
            Clear
          </Button>
        </Box>

        {/* Lọc giá */}
        <Typography sx={{ fontSize: "1rem", fontWeight: "bold", mb: 1 }}>
          Lọc theo giá
        </Typography>
        <Slider
          getAriaLabel={() => "Price range"}
          value={priceRange}
          onChange={onPriceChange}
          onChangeCommitted={onPriceCommit}
          valueLabelDisplay="auto"
          valueLabelFormat={formatPrice}
          min={0}
          max={10}
          step={1}
        />
        <Typography sx={{ mb: 3, fontSize: "0.9rem" }}>
          {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Lọc điểm đến */}
        <Typography sx={{ fontSize: "1rem", fontWeight: "bold", mb: 1 }}>
          Điểm đến
        </Typography>
        {destinations.map((dest) => (
          <FormGroup key={dest}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedDestinations.includes(dest)}
                  onChange={() => onDestinationChange(dest)}
                />
              }
              label={dest}
            />
          </FormGroup>
        ))}
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Typography sx={{ fontSize: "1rem", fontWeight: "bold", mb: 1 }}>
        Đánh giá
      </Typography>
      <Box>
        <FormGroup>
          {[5, 4, 3, 2, 1].map((stars) => (
            <Box
              key={stars}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <Radio />
              <Rating
                value={stars}
                readOnly
                precision={0.5}
                sx={{
                  color: "#f57c00", // Màu cam như hình
                }}
              />
            </Box>
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
}

export default FilterPanel;
