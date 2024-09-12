import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AdvertisementEditForm from "../../components/ModalForms/AdvertisementEditForm";
import { MemoryRouter } from "react-router-dom";

describe("AdvertisementEditForm", () => {
  const handleCloseModal = vi.fn();
  const id = "1";
  const image = "www.image.com";
  const name = "Название";
  const cost = 1000;
  const description = "Описание";

  it("should be render form with values", () => {
    render(
      <MemoryRouter>
        <AdvertisementEditForm
          id={id}
          image={image}
          name={name}
          cost={cost}
          description={description}
          handleCloseModal={handleCloseModal}
        />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/Изображение/i)).toHaveValue(image);
    expect(screen.getByLabelText(/Название/i)).toHaveValue(name);
    expect(screen.getByLabelText(/Описание/i)).toHaveValue(description);
    expect(screen.getByLabelText(/Стоимость/i)).toHaveValue(String(cost));
    expect(screen.getByText(/Изменить объявление/i)).toBeInTheDocument();
  });

  it("should be update form fields", () => {
    render(
      <MemoryRouter>
        <AdvertisementEditForm
          id={id}
          image={image}
          name={name}
          cost={cost}
          description={description}
          handleCloseModal={handleCloseModal}
        />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/Изображение/i), {
      target: { value: "new.image.com" },
    });
    fireEvent.change(screen.getByLabelText(/Название/i), { target: { value: "Новое название" } });
    fireEvent.change(screen.getByLabelText(/Описание/i), { target: { value: "Новое описание" } });
    fireEvent.change(screen.getByLabelText(/Стоимость/i), { target: { value: "2000" } });

    expect(screen.getByLabelText(/Изображение/i)).toHaveValue("new.image.com");
    expect(screen.getByLabelText(/Название/i)).toHaveValue("Новое название");
    expect(screen.getByLabelText(/Описание/i)).toHaveValue("Новое описание");
    expect(screen.getByLabelText(/Стоимость/i)).toHaveValue("2000");
  });

  it("should be show error message", async () => {
    render(
      <MemoryRouter>
        <AdvertisementEditForm
          id={id}
          image={image}
          name={name}
          cost={cost}
          description={description}
          handleCloseModal={handleCloseModal}
        />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/Изображение/i), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText(/Название/i), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText(/Описание/i), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText(/Стоимость/i), { target: { value: "" } });

    fireEvent.click(screen.getByText(/Изменить объявление/i));

    expect(await screen.findByText(/Заполните все поля./i)).toBeInTheDocument();
  });
});
