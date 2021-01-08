import { render } from "@testing-library/react";
import ErrorMessage from "./index";

describe("ErrorMessage", () => {
	it("render component", () => {
		const message = "throw error";
		const { getByText } = render(<ErrorMessage message={message} />);
		expect(getByText(message)).toBeInTheDocument();
	});
});
