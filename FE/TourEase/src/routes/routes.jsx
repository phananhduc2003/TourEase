import config from "../config";
import AdminLayout from "../layouts/adminLayout/AdminLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import HomeAdmin from "../pages/admin/homeAdmin/HomeAdmin";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/register/Register";
import ContactPage from "../pages/users/contactPage/ContactPage";
import DestinationPage from "../pages/users/destinationPage/DestinationPage";

import HomePage from "../pages/users/homePage/HomePage";
import IntroductionPage from "../pages/users/introductionPage/IntroductionPage";
import TourPage from "../pages/users/tourPage/TourPage";

const defaultRoutes = [
  { path: config.routes.home, component: HomePage },
  { path: config.routes.tourPage, component: TourPage },
  { path: config.routes.introductionPage, component: IntroductionPage },
  { path: config.routes.destinationPage, component: DestinationPage },
  { path: config.routes.contactPage, component: ContactPage },
  { path: config.routes.login, component: Login, layout: AuthLayout },
  { path: config.routes.register, component: Register, layout: AuthLayout },
];

const adminRoutes = [
  {
    path: config.routes.homeAdmin,
    component: HomeAdmin,
    layout: AdminLayout,
    protected: true,
  },
];

export { defaultRoutes, adminRoutes };
