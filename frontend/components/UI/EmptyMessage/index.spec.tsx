import { render, screen } from "@testing-library/react";
import { EmptyMessage } from "./index";

describe("EmptyMessage", () => {
  it("render component", () => {
    const message = "throw error";
    render(<EmptyMessage message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
