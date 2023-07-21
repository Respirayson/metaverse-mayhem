import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../../src/components";
import { WebProvider } from "../../src/context/WebContext";

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("Signup flow", () => {
  const handleLogin = vi.fn();
  const mockWindowRequest = vi.fn().mockResolvedValue(["mockedAddress"]);
  beforeEach(() => {
    window.ethereum = {
      on: vi.fn(),
      request: mockWindowRequest,
    };
    global.fetch = vi.fn();
    fetch.mockResolvedValueOnce(createFetchResponse(null)).mockResolvedValue(createFetchResponse({ account: "mockedToken" }));

    render(
      <WebProvider>
        <BrowserRouter>
          <Login onLoggedIn={handleLogin} text="Connect Wallet" />
        </BrowserRouter>
      </WebProvider>
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should login successfully", async () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockWindowRequest).toHaveBeenCalled();
      expect(fetch).toHaveBeenNthCalledWith(
        1,
        `https://metaverse-mayhem.onrender.com/api/v1/users?publicAddress=mockedAddress`
      );
      expect(fetch).toHaveBeenNthCalledWith(
        2,
        "https://metaverse-mayhem.onrender.com/api/v1/users/",
        {
          body: '{"publicAddress":"mockedAddress","username":"moc...ess"}',
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
        expect(fetch).toHaveBeenNthCalledWith(
          3,
          "https://metaverse-mayhem.onrender.com/api/v1/auth",
          {
            body: '{"signature":["mockedAddress"]}',
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        );
        expect(handleLogin).toHaveBeenCalled();
    });
  });
});
