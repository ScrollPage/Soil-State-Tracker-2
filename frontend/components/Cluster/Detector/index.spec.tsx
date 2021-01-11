import { Detector } from "./index";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IDetector } from "@/types/detector";

describe("Detector", () => {
  it("render component", async () => {
    const openModal = jest.fn();
    const info: IDetector = {
      id: 1,
      x: 123,
      y: -123,
      cluster: "1",
    };
    render(<Detector detector={info} showHandler={openModal} />);

    expect(screen.getByText(`id: ${info.id}`)).toBeInTheDocument();
    expect(screen.getByText(`x: ${info.x}`)).toBeInTheDocument();
    expect(screen.getByText(`y: ${info.y}`)).toBeInTheDocument();

    userEvent.click(screen.getByText(/статистика/i));

    await waitFor(() => {
      expect(openModal).toHaveBeenCalledWith(info.id);
    });
  });
});
