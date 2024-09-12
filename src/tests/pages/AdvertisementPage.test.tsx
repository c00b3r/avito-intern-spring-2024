import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdvertisementPage from "../../pages/AdvertisementsPage/AdvertisementPage";
import { Advertisment } from "../../interface";
import { describe, expect, it, vi } from "vitest";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLoaderData: () =>
      ({
        id: "1",
        imageUrl: "www.image.com",
        name: "Название",
        price: "1000",
        description: "Описание",
      }) as unknown as Advertisment,
    useNavigate: () => vi.fn(),
  };
});

describe("AdvertisementPage", () => {
  it("should display advertisement details", () => {
    render(
      <MemoryRouter>
        <AdvertisementPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("img")).toHaveAttribute("src", "www.image.com");
    expect(screen.getByText("Название")).toBeInTheDocument();
    expect(screen.getByText("Описание")).toBeInTheDocument();
    expect(screen.getByText("1000₽")).toBeInTheDocument();
  });
});
