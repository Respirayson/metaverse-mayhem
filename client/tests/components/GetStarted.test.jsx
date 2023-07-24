import React from "react";
import { render, screen } from "@testing-library/react";
import { useLottie } from "lottie-react";
import { motion } from "framer-motion";
import GetStarted from "../../src/components/GetStarted";

vi.mock("lottie-react", () => ({
  useLottie: vi.fn(),
}));

describe("GetStarted", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with the correct content", () => {
    const options = {
      animationData: {},
      loop: true,
    };

    useLottie.mockReturnValue({ View: <div data-testid="lottie-view" /> });

    render(<GetStarted />);

    const titleText = screen.getByText("Get started with just a few clicks");

    expect(titleText).toBeInTheDocument();
  });
});
