import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.tsx";
import OrdersPage from "./pages/OrderPage/OrdersPage.tsx";
import ListAdvertisementsPage from "./pages/ListAnnouncementsPage/ListAdvertisementsPage.tsx";
import AdvertisementPage from "./pages/AnnouncementPage/AdvertisementPage.tsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/advertisements",
    element: <ListAdvertisementsPage />,
    children: [
      {
        path: "advertisements/:id",
        element: <AdvertisementPage />,
      },
    ],
  },
  {
    path: "/orders",
    element: <OrdersPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
);
