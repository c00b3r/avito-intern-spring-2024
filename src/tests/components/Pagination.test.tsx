import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Pagination from "../../components/Pagination/Pagination";

describe("Pagination", () => {
  it("should render pagination controls", () => {
    render(
      <Pagination
        page={1}
        limit={10}
        onClickButtonBack={vi.fn()}
        onClickButtonNext={vi.fn()}
        onChangeLimitHandler={vi.fn()}
        totalItems={50}
      />,
    );

    expect(screen.getByRole("button", { name: /←/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /→/i })).toBeInTheDocument();
  });
});
