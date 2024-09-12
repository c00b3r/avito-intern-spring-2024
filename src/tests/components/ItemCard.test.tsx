import { render, screen } from "@testing-library/react";
import ItemCard from "../../components/ItemCard/ItemCard";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("ItemCard", () => {
  const itemProps = {
    id: "1",
    name: "Test Item",
    price: 5000,
    views: 100,
    likes: 10,
    imageUrl: "www.image.com",
  };

  it("should be renders item advertisement", () => {
    render(
      <MemoryRouter>
        <ItemCard createdAt="" {...itemProps} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("5000₽")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should be correct render image", () => {
    render(
      <MemoryRouter>
        <ItemCard createdAt="" {...itemProps} />
      </MemoryRouter>,
    );

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "www.image.com");
    expect(image).toHaveAttribute("alt", "Test Item");
  });
});
