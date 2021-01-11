import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "./index";

describe("ErrorMessage", () => {
  it("render component", () => {
    const message = "throw error";
    render(<ErrorMessage message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
