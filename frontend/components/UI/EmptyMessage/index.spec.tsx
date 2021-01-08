import { render } from "@testing-library/react";
import EmptyMessage from "./index";

describe("EmptyMessage", () => {
  it("render component", () => {
    const message = "throw error";
    const { getByText } = render(<EmptyMessage message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });
});
