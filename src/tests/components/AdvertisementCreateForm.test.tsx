import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AdvertisementForm from "../../components/ModalForms/AdvertisementCreateForm";

describe("AdvertisementCreateForm", () => {
  const handleCloseModal = vi.fn();

  it("should be renders form", () => {
    render(<AdvertisementForm handleCloseModal={handleCloseModal} />);

    expect(screen.getByLabelText(/Изображение/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Название/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Стоимость/i)).toBeInTheDocument();
    expect(screen.getByText(/Создать объявление/i)).toBeInTheDocument();
  });

  it("should be update field form", () => {
    render(<AdvertisementForm handleCloseModal={handleCloseModal} />);

    fireEvent.change(screen.getByLabelText(/Изображение/i), {
      target: { value: "www.image.com" },
    });
    fireEvent.change(screen.getByLabelText(/Название/i), { target: { value: "Название" } });
    fireEvent.change(screen.getByLabelText(/Описание/i), { target: { value: "Описание" } });
    fireEvent.change(screen.getByLabelText(/Стоимость/i), { target: { value: "1000" } });

    expect(screen.getByLabelText(/Изображение/i)).toHaveValue("www.image.com");
    expect(screen.getByLabelText(/Название/i)).toHaveValue("Название");
    expect(screen.getByLabelText(/Описание/i)).toHaveValue("Описание");
    expect(screen.getByLabelText(/Стоимость/i)).toHaveValue("1000");
  });

  it("should be shows error message", async () => {
    render(<AdvertisementForm handleCloseModal={handleCloseModal} />);

    fireEvent.click(screen.getByText(/Создать объявление/i));

    expect(await screen.findByText(/Заполните все поля./i)).toBeInTheDocument();
  });

  it("should be clear form field", async () => {
    render(<AdvertisementForm handleCloseModal={handleCloseModal} />);

    fireEvent.change(screen.getByLabelText(/Изображение/i), {
      target: { value: "www.image.com" },
    });
    fireEvent.change(screen.getByLabelText(/Название/i), { target: { value: "Название" } });
    fireEvent.change(screen.getByLabelText(/Описание/i), { target: { value: "Описание" } });
    fireEvent.change(screen.getByLabelText(/Стоимость/i), { target: { value: "1000" } });

    fireEvent.click(screen.getByText(/Создать объявление/i));

    await waitFor(() => {
      expect(handleCloseModal).toHaveBeenCalled();
    });

    expect(screen.getByLabelText(/Изображение/i)).toHaveValue("");
    expect(screen.getByLabelText(/Название/i)).toHaveValue("");
    expect(screen.getByLabelText(/Описание/i)).toHaveValue("");
    expect(screen.getByLabelText(/Стоимость/i)).toHaveValue("");
  });
});
