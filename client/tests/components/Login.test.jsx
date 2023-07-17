import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Login } from "../../src/components";
import { BrowserRouter } from "react-router-dom";

describe("Login component", () => {
  beforeEach(() => {
    window.ethereum = {
      on: vi.fn(),
    };
    window.alert = vi.fn();
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            token: "mockedToken",
          }),
      })
    );
    render(
      <BrowserRouter>
        <Login onLoggedIn={vi.fn()} text="Connect Wallet" />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the Connect Wallet button", () => {
    const button = screen.getByRole("button", { name: "Connect Wallet" });
    expect(button).toBeInTheDocument();
  });

  it("displays loading state when clicked", async () => {
    window.ethereum = true;
    const button = screen.getByRole("button");
    fireEvent.click(button);

    const loadingText = screen.getByText("Connecting...");
    expect(loadingText).toBeInTheDocument();
  });

  it("shows an alert if Metamask is not present", () => {
    global.window.ethereum = undefined;
    const button = screen.getByRole("button");
    fireEvent.click(button);

    const alertText = "Metamask is required to connect to the app.";
    expect(window.alert).toHaveBeenCalledWith(alertText);
  });
});
