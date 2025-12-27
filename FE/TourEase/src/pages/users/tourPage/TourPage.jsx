import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ApiFilterTour } from "../../../api/user/ApiFilterTour";
import { ApiGetDestinations } from "../../../api/user/ApiGetDestinations";
import TourList from "../../../components/TourListTourPage/TourList";
import FilterPanel from "../../../components/FilterPanelTourPage/FilterPanel";
import { ApiGetDepartureLocations } from "../../../api/user/ApiGetdepartureLocations";
import { ApiGetTransportations } from "../../../api/user/ApiGetTransportations";

function TourPage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tours, setTours] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [pagination, setPagination] = useState({});
  const [destinations, setDestinations] = useState([]);
  const selectedDestinations = searchParams.getAll("destinations");
  const [departureLocations, setDepartureLocations] = useState([]);
  const selectedDepartureLocations = searchParams.getAll("departureLocations");
  const [transportations, setTransportations] = useState([]);
  const selectedTransportations = searchParams.getAll("transportations");
  const [priceRange, setPriceRange] = useState([0, 15]);

  const filters = {
    page: Number(searchParams.get("page")) || 0,
    size: 9,
    destinations: searchParams.getAll("destinations"),
    departureLocations: searchParams.getAll("departureLocations"),
    transportations: searchParams.getAll("transportations"),
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sortBy: searchParams.get("sortBy") || "tourID",
    sortDir: searchParams.get("sortDir") || "asc",
  };

  useEffect(() => {
    loadTours();
    // eslint-disable-next-line
  }, [searchParams]);

  useEffect(() => {
    getDestinations();
    getDepartureLocations();
    getTransportations();
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
      const remaining = 500 - elapsed;

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

  const getDepartureLocations = async () => {
    try {
      const response = await ApiGetDepartureLocations();
      setDepartureLocations(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getTransportations = async () => {
    try {
      const response = await ApiGetTransportations();
      setTransportations(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      params.delete(key);

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== "" && value !== null) {
        params.set(key, value);
      }
    });

    params.set("page", 0);
    setSearchParams(params);
  };

  const handlePriceChange = (e, newValue) => setPriceRange(newValue);

  const handlePriceCommit = (e, newValue) => {
    handleFilterChange({
      minPrice: newValue[0] * 1000000,
      maxPrice: newValue[1] * 1000000,
    });
  };

  const handleDestinationChange = (dest) => {
    const newSelected = selectedDestinations.includes(dest)
      ? selectedDestinations.filter((d) => d !== dest)
      : [...selectedDestinations, dest];

    handleFilterChange({ destinations: newSelected });
  };

  const handleDepartureLocationChange = (location) => {
    const newSelected = selectedDepartureLocations.includes(location)
      ? selectedDepartureLocations.filter((l) => l !== location)
      : [...selectedDepartureLocations, location];

    handleFilterChange({ departureLocations: newSelected });
  };

  const handleTransportationChange = (transport) => {
    const newSelected = selectedTransportations.includes(transport)
      ? selectedTransportations.filter((t) => t !== transport)
      : [...selectedTransportations, transport];

    handleFilterChange({ transportations: newSelected });
  };

  const handlePageChange = (e, newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage - 1);
    setSearchParams(params);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (value) => {
    setSortOption(value);

    switch (value) {
      case "priceAsc":
        handleFilterChange({ sortBy: "priceAdult", sortDir: "asc" });
        break;
      case "priceDesc":
        handleFilterChange({ sortBy: "priceAdult", sortDir: "desc" });
        break;
      case "newest":
        handleFilterChange({ sortBy: "tourID", sortDir: "desc" });
        break;
      default:
        handleFilterChange({ sortBy: "tourID", sortDir: "asc" });
        break;
    }
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  const handleTourClick = (tourID) => {
    navigate(`/tour-detail/${tourID}?${searchParams.toString()}`);
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
              departureLocations={departureLocations}
              selectedDepartureLocations={selectedDepartureLocations}
              transportations={transportations}
              selectedTransportations={selectedTransportations}
              onDestinationChange={handleDestinationChange}
              onDepartureLocationChange={handleDepartureLocationChange}
              onTransportationChange={handleTransportationChange}
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
