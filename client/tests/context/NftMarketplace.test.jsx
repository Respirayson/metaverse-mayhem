import React from "react";
import { render, screen } from "@testing-library/react";
import { NftMarketplaceProvider } from "../../src/context/NftMarketplace";

describe("NftMarketplaceProvider", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <NftMarketplaceProvider>
        <div>Test</div>
      </NftMarketplaceProvider>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
