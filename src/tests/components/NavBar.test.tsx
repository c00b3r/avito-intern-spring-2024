import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NavBar from "../../components/NavBar/NavBar";
import { MemoryRouter } from "react-router-dom";

describe("NavBar", () => {
  it("should be render navigation buttons", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Объявления/i)).toBeInTheDocument();
    expect(screen.getByText(/Заказы/i)).toBeInTheDocument();
  });

  it("should be correct links for navigation buttons", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    const advertisementLink = screen.getByText(/Объявления/i).closest("a");
    const ordersLink = screen.getByText(/Заказы/i).closest("a");

    expect(advertisementLink).toHaveAttribute("href", "/advertisements");
    expect(ordersLink).toHaveAttribute("href", "/orders");
  });
});
