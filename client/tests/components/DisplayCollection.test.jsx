import { render, screen } from "@testing-library/react";
import DisplayCollection from "../../src/components/DisplayCollection/DisplayCollection";
import { TradingCardMinterProvider } from "../../src/context/TradingCardMinter";
import { WebProvider } from "../../src/context/WebContext";

describe("DisplayCollection", () => {
  it("renders the loader initially", () => {
    // Render the component with loader set to true
    render(
      <WebProvider>
        <TradingCardMinterProvider>
          <DisplayCollection index={0} userCards={[]} loading={true} deck={[]} />
        </TradingCardMinterProvider>
      </WebProvider>
    );

    // Assert that the loader is rendered
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });

  it("renders the collection cards when loading is complete", () => {
    const userCards = [
      // Array of user cards data
      {
        card: {
          name: "card1",
          image: "card1.png",
          description: "card1 description",
          type: "card1 type",
          mana: 1,
          attack: 1,
          defense: 1,
        },
        tokenId: 1,
      },
    ];

    // Render the component with loader set to false and userCards provided
    render(
      <WebProvider>
        <TradingCardMinterProvider>
          <DisplayCollection index={0} userCards={userCards} loading={false} deck={[]} />
        </TradingCardMinterProvider>
      </WebProvider>
    );

    // Assert that the collection cards are rendered
    const cardElements = screen.getAllByTestId("collectible-card");
    expect(cardElements).toHaveLength(userCards.length);
  });

  it("renders the no cards message when userCards is empty", () => {
    // Render the component with empty userCards array
    render(
      <WebProvider>
        <TradingCardMinterProvider>
          <DisplayCollection index={0} userCards={[]} loading={false} deck={[]} />
        </TradingCardMinterProvider>
      </WebProvider>
    );

    // Assert that the no cards message is rendered
    const noCardsMessage = screen.getByText(
      "No Trading Cards found in your Collection"
    );
    expect(noCardsMessage).toBeInTheDocument();
  });
});
