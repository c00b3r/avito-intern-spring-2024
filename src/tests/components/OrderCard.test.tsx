import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OrderCard from "../../components/OrderCard/OrderCard";
import { MemoryRouter } from "react-router-dom";
import { Order } from "../../interface";

const mockOrder: Order = {
  id: "1",
  createdAt: new Date().toISOString(),
  status: 0,
  total: 1000,
  items: [
    {
      id: "1",
      name: "Название",
      count: 1,
      price: 1000,
      createdAt: "12/09/2024",
      views: 0,
      likes: 0,
    },
    {
      id: "2",
      name: "Название",
      count: 2,
      price: 1000,
      createdAt: "12/09/2024",
      views: 0,
      likes: 0,
    },
  ],
  price: 123,
  deliveryWay: "sdek",
};

describe("OrderCard", () => {
  it("should render order details", () => {
    render(
      <MemoryRouter>
        <OrderCard order={mockOrder} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Номер заказа: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Дата создания:/i)).toBeInTheDocument();
    expect(screen.getByText(/Статус: Создан/i)).toBeInTheDocument();
    expect(screen.getByText(/Сумма заказа: 1000₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество товаров: 2/i)).toBeInTheDocument();
  });
});
