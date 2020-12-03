import { IDetectorData } from "@/types/detector";
import React, { useState } from "react";
import { SChart, SChartSelect } from "./styles";
import { Line } from "react-chartjs-2";
import Select from "react-select";

interface IChart {
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

export const Chart: React.FC<IChart> = ({ detectorData }) => {
  const [param, setParam] = useState(options[0]);

  const changeHandler = (param: ISelectOption) => {
    setParam(param);
  };

  return (
    <SChart>
      <SChartSelect>
        <Select
          defaultValue={options[0]}
          options={options}
          onChange={changeHandler}
        />{" "}
      </SChartSelect>
      <Line
        data={{
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
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
    </SChart>
  );
};
