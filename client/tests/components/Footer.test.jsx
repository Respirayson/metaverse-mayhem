import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer";
import Login from "../../src/components/Login/Login";

vi.mock("../../src/components/Login/Login", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("Footer", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the footer with login button when not authenticated", () => {
    const handleLogin = vi.fn();
    const authenticated = false;

    Login.mockImplementation(({ onLoggedIn, text }) => {
      onLoggedIn();
      return <button onClick={onLoggedIn}>{text}</button>;
    });

    render(
      <Footer
        handleLogin={handleLogin}
        authenticated={authenticated}
        handleLogout={() => {}}
      />
    );

    const loginButton = screen.getByText("Enter Mayhem");

    expect(loginButton).toBeInTheDocument();

    loginButton.click();

    expect(handleLogin).toHaveBeenCalledTimes(2);
  });

  it("renders the footer without login button when authenticated", () => {
    const handleLogin = vi.fn();
    const authenticated = true;

    render(
      <Footer
        handleLogin={handleLogin}
        authenticated={authenticated}
        handleLogout={() => {}}
      />
    );

    const loginButton = screen.queryByText("Enter Mayhem");

    expect(loginButton).toBeNull();
  });

  it("renders the footer with social icons", () => {
    const handleLogin = vi.fn();
    const authenticated = false;

    render(
      <Footer
        handleLogin={handleLogin}
        authenticated={authenticated}
        handleLogout={() => {}}
      />
    );

    const socialIcons = screen.getAllByAltText(/social/i);

    expect(socialIcons).toHaveLength(4);
  });
});
