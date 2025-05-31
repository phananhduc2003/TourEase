import config from "../config";

import HomePage from "../pages/users/homePage/HomePage";
import TourPage from "../pages/users/tourPage/TourPage";

const defaultRoutes = [
  { path: config.routes.home, component: HomePage },
  { path: config.routes.tourpage, component: TourPage },
];

const adminRoutes = [];

export { defaultRoutes, adminRoutes };
