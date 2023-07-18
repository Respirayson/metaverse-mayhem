import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Login } from "../../src/components";
import { BrowserRouter } from "react-router-dom";
import { WebProvider } from "../../src/context/WebContext";

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
      <WebProvider>
        <BrowserRouter>
          <Login onLoggedIn={vi.fn()} text="Connect Wallet" />
        </BrowserRouter>
      </WebProvider>
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
});
