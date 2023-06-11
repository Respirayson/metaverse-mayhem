import React from "react";
import { render } from "@testing-library/react";
import { Outlet, Navigate } from "react-router-dom";
import { PrivateRoutes } from "../src/components";

vi.mock("react-router-dom", () => ({
  Outlet: vi.fn(() => null),
  Navigate: vi.fn(() => null),
}));

describe("privateRoutes component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the outlet when authenticated", () => {
    const authenticated = true;

    render(<PrivateRoutes authenticated={authenticated} />);

    expect(Outlet).toHaveBeenCalled();
    expect(Navigate).not.toHaveBeenCalled();
    // Add assertions for the rendered component when authenticated.
  });

  it('navigates to "/" when not authenticated', () => {
    const authenticated = false;

    render(<PrivateRoutes authenticated={authenticated} />);

    expect(Navigate).toHaveBeenCalledWith(
      {
        to: "/",
      },
      {}
    );
    expect(Outlet).not.toHaveBeenCalled();
    // Add assertions for the rendered component when not authenticated.
  });
});
