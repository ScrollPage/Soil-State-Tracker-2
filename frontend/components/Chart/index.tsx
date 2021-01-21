import { IDetectorData } from "@/types/detector";
import React, { memo } from "react";
import { Wrapper } from "./styles";
import { ResponsiveLine } from "@nivo/line";

interface ChartProps {
  detectorData: IDetectorData[];
  value: string;
  label: string;
}

const ChartComponent: React.FC<ChartProps> = ({
  detectorData,
  value,
  label,
}) => {
  return (
    <Wrapper>
      <ResponsiveLine
        data={[
          {
            id: label,
            data: detectorData.map((item, index) => ({
              // @ts-ignore
              y: item?.[value],
              x: index + 1,
              // x: item.timestamp.slice(0, 10),
            })),
          },
        ]}
        colors="#60CFBF"
        pointColor="#60CFBF"
        margin={{ top: 10, right: 10, bottom: 50, left: 30 }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Дата",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointBorderWidth={2}
        pointBorderColor="#ffffff"
        useMesh={true}
        theme={{}}
      />
    </Wrapper>
  );
};

export const Chart = memo(ChartComponent);
