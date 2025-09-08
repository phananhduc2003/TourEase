import {
  Box,
  Button,
  Checkbox,
  Divider,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Alert,
  Grid,
  MenuItem,
  Radio,
  Rating,
  Select,
  Slider,
  Typography,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ApiFilterTour } from "../../../api/user/ApiFilterTour";
import { ApiGetDestinations } from "../../../api/user/ApiGetDestinations";
import TourList from "../../../components/TourListTourPage/TourList";
import FilterPanel from "../../../components/FilterPanelTourPage/FilterPanel";

function TourPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tours, setTours] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [pagination, setPagination] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10]);

  const [filters, setFilters] = useState({
    page: 0,
    size: 9,
    destinations: [],
    minPrice: "",
    maxPrice: "",
    sortBy: "tourID",
    sortDir: "desc",
  });

  useEffect(() => {
    loadTours();
  }, [filters]);

  useEffect(() => {
    getDestinations();
  }, []);

  const loadTours = async () => {
    try {
      setLoading(true);
      setError(null);

      const startTime = Date.now();
      const response = await ApiFilterTour(filters);

      // Update data
      setTours(response.data.tours);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
      });

      // Tính thời gian API call
      const elapsed = Date.now() - startTime;
      const remaining = 500 - elapsed; // 1000ms = 1s

      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setError(error.message || "Không thể tải dữ liệu");
      console.error("Error loading tours:", error);
      setLoading(false);
    }
  };

  const getDestinations = async () => {
    try {
      const response = await ApiGetDestinations();
      setDestinations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 0 }));
  };

  const handlePriceChange = (e, newValue) => setPriceRange(newValue);

  const handlePriceCommit = (e, newValue) => {
    handleFilterChange({
      minPrice: newValue[0] * 1000000,
      maxPrice: newValue[1] * 1000000,
    });
  };

  const handleDestinationChange = (dest, clearAll = false) => {
    if (clearAll) {
      setSelectedDestinations([]);
      handleFilterChange({ destinations: [] });
      return;
    }

    const newSelected = selectedDestinations.includes(dest)
      ? selectedDestinations.filter((d) => d !== dest)
      : [...selectedDestinations, dest];

    setSelectedDestinations(newSelected);
    handleFilterChange({ destinations: newSelected });
  };

  const handlePageChange = (e, newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage - 1 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    if (value === "priceAsc") {
      handleFilterChange({ sortBy: "priceAdult", sortDir: "asc" });
    } else if (value === "priceDesc") {
      handleFilterChange({ sortBy: "priceAdult", sortDir: "desc" });
    } else if (value === "newest") {
      handleFilterChange({ sortBy: "tourID", sortDir: "desc" });
    } else {
      handleFilterChange({ sortBy: "tourID", sortDir: "desc" });
    }
  };

  const handleClearFilters = () => {
    setSelectedDestinations([]);
    setPriceRange([0, 10]);
    setFilters({
      page: 0,
      size: 9,
      destinations: [],
      minPrice: "",
      maxPrice: "",
      sortBy: "tourID",
      sortDir: "desc",
    });
  };

  const handleTourClick = (tourID) => {
    navigate(`/tour-detail/${tourID}`);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Box sx={{ width: "80%" }}>
        <Grid container spacing={2}>
          <Grid
            item
            md={3}
            sx={{
              display: { xs: "none", sm: "none", lg: "block" },
              minHeight: "100vh",
            }}
          >
            <FilterPanel
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              onPriceCommit={handlePriceCommit}
              destinations={destinations}
              selectedDestinations={selectedDestinations}
              onDestinationChange={handleDestinationChange}
              onClearFilters={handleClearFilters}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <TourList
              tours={tours}
              loading={loading}
              error={error}
              pagination={pagination}
              onRetry={loadTours}
              onPageChange={handlePageChange}
              sortOption={sortOption}
              onSortChange={handleSortChange}
              onTourDetailClick={handleTourClick}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default TourPage;
