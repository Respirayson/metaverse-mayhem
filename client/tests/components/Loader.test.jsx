import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Loader from "../../src/components/Loader";

vi.useFakeTimers();

describe("Loader", () => {
  it("renders the component with loading circles", () => {
    render(<Loader />);

    const loadingCircles = document.querySelectorAll(".circle");

    expect(loadingCircles).toHaveLength(3);
  });

  it("updates the quote every 5 seconds", async () => {
    render(<Loader />);

    const quoteElement = screen.getByTestId("quote");

    expect(quoteElement).toBeInTheDocument();
    const initialQuote = quoteElement.textContent;

    vi.advanceTimersByTime(5000);
    await waitFor(() => expect(quoteElement.textContent).not.toBe(initialQuote));

    vi.advanceTimersByTime(5000);
    await waitFor(() => expect(quoteElement.textContent).not.toBe(initialQuote));
  });
});
