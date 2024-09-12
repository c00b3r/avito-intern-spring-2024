import { describe, expect, it, Mock, vi } from "vitest";
import { loader } from "../../pages/AdvertisementsPage/advertisementLoader";
import { Advertisment } from "../../interface";
import { LoaderFunctionArgs } from "react-router-dom";

globalThis.fetch = vi.fn();

describe("loader", () => {
  it("should return advertisement data", async () => {
    const mockAdvertisement: Advertisment = {
      id: "1",
      imageUrl: "http://example.com/image.jpg",
      name: "Test Advertisement",
      price: 1000,
      description: "Test Description",
      createdAt: "12/09/2024",
      views: 0,
      likes: 0,
    };

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAdvertisement,
    });

    const params: LoaderFunctionArgs = {
      params: { id: "1" },
      request: new Request("http://localhost"),
    };
    const data = await loader(params);

    expect(data).toEqual(mockAdvertisement);
  });

  // it("should throw an error if fetch fails", async () => {
  //   (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

  //   const params = { id: "1" };

  //   await expect(loader({ params } as any)).rejects.toThrow("Fetch error");
  // });

  // it("should handle non-200 response", async () => {
  //   (fetch as jest.Mock).mockResolvedValueOnce({
  //     ok: false,
  //     json: async () => ({ message: "Error" }),
  //   });

  //   const params = { id: "1" };

  //   await expect(loader({ params } as any)).rejects.toThrow("Network response was not ok");
  // });
});
