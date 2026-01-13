import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Laddus from "../pages/Laddus/Laddus";
import Testimonials from "../pages/Testimonials/Testimonials";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Login from "../pages/auth/Login";
import Registration from "../pages/auth/Registration";

import Shop from "../pages/Shop/Shop";
import ReturnPolicy from "../pages/Policies/ReturnPolicy";
import ShippingPolicy from "../pages/Policies/ShippingPolicy";
import TermsOfService from "../pages/Policies/TermsOfService";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Registration /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
      { path: "laddus", element: <Laddus /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "testimonials", element: <Testimonials /> },
      { path: "contact", element: <Contact /> },
      { path: "return-policy", element: <ReturnPolicy /> },
      { path: "shipping-policy", element: <ShippingPolicy /> },
      { path: "terms-of-service", element: <TermsOfService /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);