import { IDetector } from "@/types/detector";
import { render, screen } from "@testing-library/react";
import ControlItem from "./index";

const data: IDetector = {
  cluster: "1cluster",
  id: 1,
  x: 123,
  y: -123,
};

describe("ErrorMessage", () => {
  it("render component", () => {
    const clusterId = 5;
    render(
      <ControlItem
        id={data.id}
        x={data.x}
        y={data.y}
        cluster={data.cluster}
        clusterId={clusterId}
      />
    );
    expect(screen.getByText("id: 1")).toBeInTheDocument();
  });
});
