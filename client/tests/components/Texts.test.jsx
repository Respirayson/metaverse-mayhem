import { render } from "@testing-library/react";
import { TypingText, TitleText } from "../../src/components/Texts";

describe("TypingText", () => {
  it("renders the title correctly", () => {
    const title = "Welcome to the Metaverse";

    // Render the component
    render(<TypingText title={title} />);

    // Assert that the title is rendered correctly
    expect(document.querySelector('body').textContent).toContain('Welcome');
    expect(document.querySelector('body').textContent).toContain('to');
    expect(document.querySelector('body').textContent).toContain('the');
    expect(document.querySelector('body').textContent).toContain('Metaverse');
  });
});

describe("TitleText", () => {
  it("renders the title correctly", () => {
    const title = "Join the Adventure";

    // Render the component
    const { getByText } = render(<TitleText title={title} />);

    // Assert that the title is rendered correctly
    expect(getByText(title)).toBeInTheDocument();
  });
});
