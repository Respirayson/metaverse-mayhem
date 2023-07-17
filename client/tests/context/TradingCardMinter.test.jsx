import React from "react";
import { render, screen } from "@testing-library/react";
import {
  TradingCardMinterProvider,
  TradingCardMinterContext,
} from "../../src/context/TradingCardMinter";

describe("TradingCardMinterProvider", () => {
  beforeEach(() => {
    window.alert = vi.fn();
  });

  it("should render the provider and pass down the correct context values", () => {
    render(
      <TradingCardMinterProvider>
        <ChildComponent />
      </TradingCardMinterProvider>
    );

    expect(screen.getByText("Current Account:")).toBeInTheDocument();
  });
});

// ChildComponent is a dummy component used for testing
const ChildComponent = () => {
  const { currentAccount } = React.useContext(TradingCardMinterContext);

  return (
    <div>
      <h1>Current Account: {currentAccount}</h1>
    </div>
  );
};
