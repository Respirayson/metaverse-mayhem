import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../../src/components/SideBar";
import { NftMarketplaceContext } from "../../src/context/NftMarketplace";
import { BrowserRouter } from "react-router-dom";

describe("Sidebar", () => {
  it("renders the component with correct content", () => {
    const mockGetProceeds = vi.fn().mockResolvedValue("0.0");
    const mockWithdrawProceeds = vi.fn().mockResolvedValue(undefined);

    const { container } = render(
      <BrowserRouter><Sidebar url="/dashboard" /></BrowserRouter>,
      {
        wrapper: ({ children }) => (
          <NftMarketplaceContext.Provider
            value={{
              getProceeds: mockGetProceeds,
              withdrawProceeds: mockWithdrawProceeds,
            }}
          >
            {children}
          </NftMarketplaceContext.Provider>
        ),
      }
    );

    const withdrawButton = document.querySelector('#withdraw');

    expect(mockGetProceeds).toHaveBeenCalledTimes(1);
    expect(mockWithdrawProceeds).toHaveBeenCalledTimes(0);

    fireEvent.click(withdrawButton);

    expect(mockWithdrawProceeds).toHaveBeenCalledTimes(1);

    expect(container).toMatchSnapshot();
  });
});
