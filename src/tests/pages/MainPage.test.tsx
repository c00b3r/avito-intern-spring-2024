import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../components/NavBar/NavBar", () => ({
  default: vi.fn(() => <div>NavBar</div>),
}));

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Outlet: vi.fn(() => <div>Outlet</div>),
  };
});

describe("MainPage", () => {
  it("renders NavBar and Outlet", () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("NavBar")).toBeInTheDocument();

    expect(screen.getByText("Outlet")).toBeInTheDocument();
  });
});
