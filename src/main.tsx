import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.tsx";
import OrdersPage from "./pages/OrderPage/OrdersPage.tsx";
import ListAdvertisementsPage from "./pages/ListAdvertisementsPage/ListAdvertisementsPage.tsx";
import AdvertisementPage from "./pages/AdvertisementsPage/AdvertisementPage.tsx";
import { loader as loaderAdvetisement } from "./pages/AdvertisementsPage/advertisementLoader.ts";
import NotFoundPage from "./pages/NotFoundPage.tsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "/advertisements",
        element: <ListAdvertisementsPage />,
      },
      {
        path: "/advertisements/:id",
        element: <AdvertisementPage />,
        loader: loaderAdvetisement,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
);
