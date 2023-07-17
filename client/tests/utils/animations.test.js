import { waitFor } from "@testing-library/react";
import sparkle, {
  getCoords,
  getPlayerCoords,
} from "../../src/utils/animations";

describe("sparkle", () => {
  it("should create explosions", async () => {
    const appendChildMock = vi.spyOn(document.body, "appendChild");

    sparkle({ pageX: 100, pageY: 200 });

    await waitFor(() => {
      expect(appendChildMock).toHaveBeenCalled();
      expect(appendChildMock.mock.calls[0][0].className).toBe("container");
      expect(appendChildMock.mock.calls[1][0].className).toBe("container");
      expect(appendChildMock.mock.calls[2][0].className).toBe("container");
    });
  });
});

describe("getCoords", () => {
  it("should return the correct page coordinates", () => {
    const cardRef = {
      current: {
        getBoundingClientRect: vi.fn(() => ({
          left: 10,
          top: 20,
          right: 110,
          bottom: 120,
        })),
      },
    };

    const coords = getCoords(cardRef);

    expect(coords.pageX).toBe(50);
    expect(coords.pageY).toBe(70);
    expect(cardRef.current.getBoundingClientRect).toHaveBeenCalledTimes(1);
  });
});

describe("getPlayerCoords", () => {
  it("should return the correct page coordinates", () => {
    const cardRef = {
      current: {
        getBoundingClientRect: vi.fn(() => ({
          left: 10,
          top: 20,
          right: 110,
          bottom: 120,
        })),
      },
    };

    const coords = getPlayerCoords(cardRef);

    expect(coords.pageX).toBe(60);
    expect(coords.pageY).toBe(70);
    expect(cardRef.current.getBoundingClientRect).toHaveBeenCalledTimes(1);
  });
});
