import { IDetectorData } from "@/types/detector";
import React, { useState } from "react";
import { Wrapper, MySelect } from "./styles";
import { Line } from "react-chartjs-2";
import Select from "react-select";

interface ChartProps {
  detectorData: IDetectorData[];
}

interface ISelectOption {
  value: string;
  label: string;
}

const options: ISelectOption[] = [
  { value: "first_temp", label: "Температура 1.0" },
  { value: "second_temp", label: "Температура 2.0" },
  { value: "third_temp", label: "Температура 3.0" },
  { value: "humidity", label: "Влажность" },
  { value: "pH", label: "Водородный показатель" },
];

export const Chart: React.FC<ChartProps> = ({ detectorData }) => {
  const [param, setParam] = useState(options[0]);

  const changeHandler = (param: any) => {
    setParam(param);
  };

  return (
    <Wrapper>
      <MySelect>
        <Select
          defaultValue={options[0]}
          options={options}
          onChange={changeHandler}
        />{" "}
      </MySelect>
      <Line
        data={{
          labels: detectorData.map((item) => item.timestamp),
          datasets: [
            {
              label: param.label,
              data: detectorData.map((item, index) => ({
                // @ts-ignore
                y: item?.[param.value],
                x: index + 1,
              })),
              borderColor: "#805ad5",
              backgroundColor: "white",
            },
          ],
        }}
        height={300}
        width={500}
      />
    </Wrapper>
  );
};
