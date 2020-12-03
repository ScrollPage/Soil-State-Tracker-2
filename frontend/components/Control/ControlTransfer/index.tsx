import EmptyMessage from "@/components/UI/EmptyMessage";
import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { IDetector } from "@/types/detector";
import React from "react";
import useSWR from "swr";
import { ControlClusterItem } from "../ControlClusterItem";
import { ControlItem } from "../ControlItem";
import { STransfer } from "./styles";

const renderControlItems = (detectors: IDetector[]) => {
  return detectors.map((detector) => (
    <ControlItem
      key={`contolItem__key__${detector.id}`}
      id={detector.id}
      x={detector.x}
      y={detector.y}
    />
  ));
};

interface IControlTransfer {
  detectors: IDetector[] | null;
}

export const ControlTransfer: React.FC<IControlTransfer> = ({ detectors }) => {
  const { data: detectorData, error: detecotorError } = useSWR(
    "/api/detector/",
    {
      initialData: detectors,
    }
  );

  if (detecotorError)
    return <ErrorMessage message="Ошибка вывода детекторов" />;

  if (!detectorData) return <LoadingSpinner />;

  if (detectorData?.length === 0)
    return <EmptyMessage message="У вас нет доступных детекторов" />;

  return (
    <STransfer>
      <ControlClusterItem title="Общие датчики" detectors={detectorData} />
    </STransfer>
  );
};
