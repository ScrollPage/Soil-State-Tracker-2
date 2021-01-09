import RenderControlItems from "./index";
import { screen, render, getAllByTestId } from "@testing-library/react";
import { IDetector } from "@/types/detector";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const data: IDetector[] = [
  {
    cluster: "1cluster",
    id: 1337,
    x: 123,
    y: -123,
  },
  {
    cluster: "1cluster",
    id: 1338,
    x: 50,
    y: 12,
  },
];

describe("RenderControlItems", () => {
  it("render component", async () => {
    const clusterId = 5;
    render(
      <DndProvider backend={HTML5Backend}>
        <RenderControlItems detectors={data} id={clusterId} />
      </DndProvider>
    );
    const items = await screen.findAllByTestId("controlItem");
    expect(items).toHaveLength(2);
  });

  it("render component with empty data", async () => {
    const clusterId = 5;
    render(
      <DndProvider backend={HTML5Backend}>
        <RenderControlItems detectors={[]} id={clusterId} />
      </DndProvider>
    );
    const items = await screen.findByText("В данной группе нет детекторов");
    expect(items).toBeInTheDocument();
  });
});
