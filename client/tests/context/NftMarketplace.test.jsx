import React from "react";
import { render, screen } from "@testing-library/react";
import { NftMarketplaceProvider } from "../../src/context/NftMarketplace";
import { WebProvider } from "../../src/context/WebContext";

describe("NftMarketplaceProvider", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <WebProvider>
        <NftMarketplaceProvider>
          <div>Test</div>
        </NftMarketplaceProvider>
      </WebProvider>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
