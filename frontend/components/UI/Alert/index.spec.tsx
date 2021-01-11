import { Provider } from "react-redux";
import { createStore } from "redux";
import { cleanup, render, screen } from "@testing-library/react";
import { Alert } from "./index";
import { alertReducer as reducer } from "@/store/reducers/alert";

jest.useFakeTimers();
afterEach(cleanup);

const renderWithRedux = (
  ui: React.ReactElement,
  { state, store = createStore(reducer, state) }: any = {}
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

const renderWithText = (expectedText: string | null) => {
  renderWithRedux(<Alert />, {
    state: {
      alert: {
        text: expectedText,
        typeOf: "success",
        IsNotClose: false,
      },
    },
  });
};

describe("Alert", () => {
  it("initial render with empty component", () => {
    renderWithText(null);

    expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
  });

  it("render alert with text through redux", async () => {
    const expectedText = "Hello, I'm Alert!";
    renderWithText(expectedText);

    const item = await screen.findByText(expectedText);
    expect(item).toBeInTheDocument();
  });

  it("last test + close alert after 3000ms", async () => {
    const expectedText = "Hello, I'm Alert!";
    renderWithText(expectedText);

    const item = await screen.findByText(expectedText);
    expect(item).toBeInTheDocument();
    expect(screen.getByTestId("alert")).toBeInTheDocument();

    jest.advanceTimersByTime(3200);

    screen.debug();
    expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
  });
});
