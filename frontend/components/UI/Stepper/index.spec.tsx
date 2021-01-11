import { render, screen } from "@testing-library/react";
import { Stepper } from "./index";

describe("Stepper", () => {
  it("render 1 step", () => {
    const expectedStep = 0;
    render(<Stepper step={expectedStep} />);
    expect(screen.getByText("Заполнение данных")).toBeInTheDocument();
  });
  it("render 2 step", () => {
    const expectedStep = 1;
    render(<Stepper step={expectedStep} />);
    expect(screen.getByText("Создание аккаунта")).toBeInTheDocument();
  });
});
