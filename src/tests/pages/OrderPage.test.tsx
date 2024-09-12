import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrdersPage from "../../pages/OrderPage/OrdersPage";
import { Order } from "../../interface";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

const mockOrders: Order[] = [
  {
    id: "1",
    status: 1,
    total: 500,
    price: 213,
    createdAt: "12/32/32",
    items: [
      { id: "2", name: "aboba", price: 1234, count: 2, createdAt: "12.32.32", views: 0, likes: 0 },
    ],
    deliveryWay: "sdek",
  },
  {
    id: "2",
    status: 3,
    total: 600,
    price: 2134,
    createdAt: "12/32/2002",
    items: [
      { id: "24", name: "qwer", price: 12434, count: 4, createdAt: "12.32.32", views: 0, likes: 0 },
    ],
    deliveryWay: "sdek",
  },
  {
    id: "3",
    status: 0,
    total: 5040,
    price: 2143,
    createdAt: "12/44/32",
    items: [
      {
        id: "3",
        name: "a234a",
        price: 12344,
        count: 24,
        createdAt: "12.01.2002",
        views: 0,
        likes: 0,
      },
    ],
    deliveryWay: "sdek",
  },
];

globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockOrders),
  }),
) as Mock;

describe("OrdersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the orders and filters correctly", async () => {
    render(<OrdersPage />);

    await waitFor(() => {
      expect(screen.getByText("Ваши заказы")).toBeInTheDocument();
    });

    expect(screen.getByText(/500/i)).toBeInTheDocument();
    expect(screen.getByText(/600/i)).toBeInTheDocument();
    expect(screen.getByText(/5040/i)).toBeInTheDocument();
  });

  it("sorts orders by price", async () => {
    render(<OrdersPage />);

    await waitFor(() => {
      expect(screen.getByText("Ваши заказы")).toBeInTheDocument();
    });

    await waitFor(() => {
      const sortButton = screen.getByText(/Сортировать по сумме \(по убыванию\)/i);
      fireEvent.click(sortButton);
    });
    const sortedOrders = screen.getAllByText(/Сумма заказа/i).map((el) => el.textContent);
    expect(sortedOrders).toEqual([
      "Сумма заказа: 5040₽",
      "Сумма заказа: 600₽",
      "Сумма заказа: 500₽",
    ]);
  });

  // it("handles pagination", async () => {
  //   render(<OrdersPage />);

  //   await waitFor(() => {
  //     expect(screen.getByText("Ваши заказы")).toBeInTheDocument();
  //   });

  //   const nextButton = screen.getByText(/Next/i);
  //   fireEvent.click(nextButton);

  //   expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  // });
});
