import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ListAdvertisementsPage from "../../pages/ListAdvertisementsPage/ListAdvertisementsPage";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

globalThis.fetch = vi.fn();

const mockAdvertisements = [
  {
    id: "1",
    name: "Название 1",
    price: 1000,
    likes: 5,
    views: 50,
    imageUrl: "www.image.com",
    description: "Описание 1",
    createdAt: "12/09/2024",
  },
  {
    id: "2",
    name: "Название 2",
    price: 2000,
    likes: 10,
    views: 100,
    imageUrl: "www.image.com",
    description: "Описание 2",
    createdAt: "13/09/2024",
  },
];

describe("ListAdvertisementsPage", () => {
  beforeEach(() => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAdvertisements,
    });
  });

  it("renders loading state initially", async () => {
    render(
      <MemoryRouter>
        <ListAdvertisementsPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Загрузка данных.../i)).toBeInTheDocument();
  });

  it("should be display advertisements", async () => {
    render(
      <MemoryRouter>
        <ListAdvertisementsPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Название 1")).toBeInTheDocument();
      expect(screen.getByText("Название 2")).toBeInTheDocument();
    });
  });

  it("should be handles search input", async () => {
    render(
      <MemoryRouter>
        <ListAdvertisementsPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Название 1")).toBeInTheDocument();
      expect(screen.getByText("Название 2")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Поиск по объявлениям");
    fireEvent.change(searchInput, { target: { value: "1" } });
    fireEvent.click(screen.getByText(/Поиск/i));

    await waitFor(() => {
      expect(screen.getByText("Название 1")).toBeInTheDocument();
      expect(screen.queryByText("Название 2")).toBeNull();
    });
  });

  it("should be sorts advertisements by price", async () => {
    render(
      <MemoryRouter>
        <ListAdvertisementsPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Название 1")).toBeInTheDocument();
      expect(screen.getByText("Название 2")).toBeInTheDocument();
    });

    const sortSelect = screen.getByDisplayValue("none");
    fireEvent.change(sortSelect, { target: { value: "price" } });

    await waitFor(() => {
      const advertisements = screen.getAllByText(/Название/i);
      expect(advertisements[0]).toHaveTextContent("Название 1");
      expect(advertisements[1]).toHaveTextContent("Название 2");
    });
  });
});
