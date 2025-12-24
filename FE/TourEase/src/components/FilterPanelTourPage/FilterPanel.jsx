import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
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
  departureLocations,
  selectedDepartureLocations,
  onDepartureLocationChange,
  transportations,
  selectedTransportations,
  onTransportationChange,
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

        <Typography sx={{ fontSize: "1rem", fontWeight: "bold", mb: 1 }}>
          Ngân sách
        </Typography>
        <Slider
          getAriaLabel={() => "Price range"}
          value={priceRange}
          onChange={onPriceChange}
          onChangeCommitted={onPriceCommit}
          valueLabelDisplay="auto"
          valueLabelFormat={formatPrice}
          min={0}
          max={15}
          step={1}
        />
        <Typography sx={{ mb: 3, fontSize: "0.9rem" }}>
          {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
        </Typography>

        <Divider sx={{ mb: 2 }} />

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
        <Divider sx={{ mb: 2 }} />

        <Typography sx={{ fontSize: "1rem", fontWeight: "bold", mb: 1 }}>
          Điểm khởi hành
        </Typography>
        {departureLocations.map((depar) => (
          <FormGroup key={depar}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedDepartureLocations.includes(depar)}
                  onChange={() => onDepartureLocationChange(depar)}
                />
              }
              label={depar}
            />
          </FormGroup>
        ))}
        <Divider sx={{ mb: 2 }} />
        <Typography sx={{ fontSize: "1rem", fontWeight: "bold", mb: 1 }}>
          Phương tiện
        </Typography>
        {transportations.map((transport) => (
          <FormGroup key={transport}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedTransportations.includes(transport)}
                  onChange={() => onTransportationChange(transport)}
                />
              }
              label={transport}
            />
          </FormGroup>
        ))}
      </Box>
    </Box>
  );
}

export default FilterPanel;
