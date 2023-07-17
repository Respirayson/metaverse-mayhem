import { render } from "@testing-library/react";
import Starter from "../../src/components/Starter";

describe("Starter", () => {
  it("renders the number and text correctly", () => {
    const number = "01";
    const text = "Start your journey";

    // Render the component
    const { getByText } = render(<Starter number={number} text={text} />);

    // Assert that the number and text are rendered correctly
    expect(getByText(number)).toBeInTheDocument();
    expect(getByText(text)).toBeInTheDocument();
  });
});
