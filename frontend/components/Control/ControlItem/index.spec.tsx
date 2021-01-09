import { IDetector } from "@/types/detector";
import { render, screen } from "@testing-library/react";
import ControlItem from "./index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const data: IDetector = {
  cluster: "1cluster",
  id: 1337,
  x: 123,
  y: -123,
};

describe("ErrorMessage", () => {
  it("render component", () => {
    const clusterId = 5;
    render(
      <DndProvider backend={HTML5Backend}>
        <ControlItem
          id={data.id}
          x={data.x}
          y={data.y}
          cluster={data.cluster}
          clusterId={clusterId}
        />
      </DndProvider>
    );
    expect(screen.getByText("1337")).toBeInTheDocument();
  });
});
