import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Login } from "../../src/components";

// Mock the necessary dependencies and global objects
vi.mock("../utils/connect", () => ({
  connectWallet: vi.fn(() => Promise.resolve("mockedAccount")),
  checkWalletConnected: vi.fn(() => Promise.resolve("mockedAccount")),
}));
vi.mock("../utils/authentication", () => ({
  handleAuthenticate: vi.fn(() => Promise.resolve({ token: "mockedToken" })),
  handleSignMessage: vi.fn(() => Promise.resolve({ publicAddress: "mockedAddress", signature: "mockedSignature" })),
  handleSignup: vi.fn(() => Promise.resolve({ publicAddress: "mockedAddress", nonce: "mockedNonce" })),
}));
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        token: "mockedToken",
      }),
  })
);

describe("Login component", () => {
  beforeEach(() => {
    render(<Login onLoggedIn={vi.fn()} />);
  });

  it("renders the Connect Wallet button", () => {
    const button = screen.getByRole("button", { name: "Connect Wallet" });
    expect(button).toBeInTheDocument();
  });

});
