import httpRequest from "../../utils/httpRequest";

export const ApiLatestTour = () => httpRequest.get("/api/public/tours/latest");
