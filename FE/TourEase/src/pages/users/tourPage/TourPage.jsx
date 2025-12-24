import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ApiFilterTour } from "../../../api/user/ApiFilterTour";
import { ApiGetDestinations } from "../../../api/user/ApiGetDestinations";
import TourList from "../../../components/TourListTourPage/TourList";
import FilterPanel from "../../../components/FilterPanelTourPage/FilterPanel";
import { ApiGetDepartureLocations } from "../../../api/user/ApiGetdepartureLocations";
import { ApiGetTransportations } from "../../../api/user/ApiGetTransportations";

function TourPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tours, setTours] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [pagination, setPagination] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [departureLocations, setDepartureLocations] = useState([]);
  const [selectedDepartureLocations, setSelectedDepartureLocations] = useState(
    []
  );
  const [transportations, setTransportations] = useState([]);
  const [selectedTransportations, setSelectedTransportations] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 15]);

  const [filters, setFilters] = useState({
    page: 0,
    size: 9,
    destinations: [],
    departureLocations: [],
    transportations: [],
    minPrice: "",
    maxPrice: "",
    sortBy: "tourID",
    sortDir: "asc",
  });

  useEffect(() => {
    loadTours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

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

  const handleDepartureLocationChange = (location, clearAll = false) => {
    if (clearAll) {
      setSelectedDepartureLocations([]);
      handleFilterChange({ departureLocations: [] });
      return;
    }

    const newSelected = selectedDepartureLocations.includes(location)
      ? selectedDepartureLocations.filter((l) => l !== location)
      : [...selectedDepartureLocations, location];

    setSelectedDepartureLocations(newSelected);
    handleFilterChange({ departureLocations: newSelected });
  };

  const handleTransportationChange = (transport, clearAll = false) => {
    if (clearAll) {
      setSelectedTransportations([]);
      handleFilterChange({ transportations: [] });
      return;
    }

    const newSelected = selectedTransportations.includes(transport)
      ? selectedTransportations.filter((t) => t !== transport)
      : [...selectedTransportations, transport];

    setSelectedTransportations(newSelected);
    handleFilterChange({ transportations: newSelected });
  };

  const handlePageChange = (e, newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage - 1 }));
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
    setSelectedDestinations([]);
    setSelectedDepartureLocations([]);
    setSelectedTransportations([]);
    setPriceRange([0, 15]);
    setSortOption("");
    setFilters({
      page: 0,
      size: 9,
      destinations: [],
      departureLocations: [],
      transportations: [],
      minPrice: "",
      maxPrice: "",
      sortBy: "tourID",
      sortDir: "asc",
    });
  };

  const handleTourClick = (tourID) => {
    navigate(`/tour-detail/${tourID}`);
    window.scrollTo(0, 0);
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
