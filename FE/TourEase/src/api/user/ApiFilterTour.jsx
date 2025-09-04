import httpRequest from "../../utils/httpRequest";
import qs from "qs"; // thư viện query-string (axios có sẵn)

export const ApiFilterTour = (params = {}) => {
  const processedParams = { ...params };

  if (
    params.destinations &&
    Array.isArray(params.destinations) &&
    params.destinations.length > 0
  ) {
    processedParams.destinations = params.destinations;
  } else {
    delete processedParams.destinations;
  }

  return httpRequest.get("/api/public/tours/filter", {
    params: {
      page: 0,
      size: 6,
      ...processedParams,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
};
