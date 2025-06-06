import config from "../config";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/auth/Login";

import HomePage from "../pages/users/homePage/HomePage";
import TourPage from "../pages/users/tourPage/TourPage";

const defaultRoutes = [
  { path: config.routes.home, component: HomePage },
  { path: config.routes.tourpage, component: TourPage },
  { path: config.routes.login, component: Login, layout: AuthLayout },
];

const adminRoutes = [];

export { defaultRoutes, adminRoutes };
