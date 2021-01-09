import RenderControlItems from "./index";
import { screen, render } from "@testing-library/react";
import { IDetector } from "@/types/detector";

const data: IDetector[] = [
  {
    cluster: "1cluster",
    id: 1,
    x: 123,
    y: -123,
  },
  {
    cluster: "1cluster",
    id: 2,
    x: 50,
    y: 12,
  },
];

describe("RenderControlItems", () => {
  it("render component", () => {
    const clusterId = 5;
    render(<RenderControlItems detectors={data} id={clusterId} />);
    
  });
});
