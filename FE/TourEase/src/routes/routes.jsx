import config from "../config";
import AdminLayout from "../layouts/adminLayout/AdminLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import HomeAdmin from "../pages/admin/homeAdmin/HomeAdmin";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/register/Register";
import BookingPage from "../pages/users/bookingPage/BookingPage";
import ContactPage from "../pages/users/contactPage/ContactPage";
import DestinationPage from "../pages/users/destinationPage/DestinationPage";

import HomePage from "../pages/users/homePage/HomePage";
import IntroductionPage from "../pages/users/introductionPage/IntroductionPage";
import OrderDetailTour from "../pages/users/orderDetailTour/OrderDetailTour";
import TourDetail from "../pages/users/tourDetail/TourDetail";
import TourPage from "../pages/users/tourPage/TourPage";
import InforUser from "../pages/users/profileUser/ProfileUser";
import InforToured from "../pages/users/inforToured/InforToured";
import inforUserLayout from "../layouts/inforUserLayout/inforUserLayout";

const defaultRoutes = [
  { path: config.routes.home, component: HomePage },
  { path: config.routes.tourPage, component: TourPage },
  { path: config.routes.tourDetail, component: TourDetail },
  { path: config.routes.introductionPage, component: IntroductionPage },
  { path: config.routes.destinationPage, component: DestinationPage },
  { path: config.routes.contactPage, component: ContactPage },
  {
    path: config.routes.orderDetailTour,
    component: OrderDetailTour,
    protected: true,
  },
  { path: config.routes.bookingPage, component: BookingPage },

  { path: config.routes.login, component: Login, layout: AuthLayout },
  { path: config.routes.register, component: Register, layout: AuthLayout },

  {
    path: config.routes.profile,
    component: InforUser,
    layout: inforUserLayout,
  },
  {
    path: config.routes.inforToured,
    component: InforToured,
    layout: inforUserLayout,
    // protected: true,
  },
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
