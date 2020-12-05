import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { IDetector } from "@/types/detector";
import React, { memo } from "react";
import useSWR from "swr";
import ControlClusterItem from "../ControlClusterItem";
import { STransfer } from "./styles";

interface IControlTransfer {
  detectors: IDetector[] | null;
}

const ControlTransfer: React.FC<IControlTransfer> = ({ detectors }) => {
  const { data: detectorData, error: detecotorError } = useSWR(
    "/api/detector/",
    {
      initialData: detectors,
    }
  );

  if (detecotorError)
    return <ErrorMessage message="Ошибка вывода детекторов" />;

  if (!detectorData) return <LoadingSpinner />;

  return (
    <STransfer>
      <ControlClusterItem
        id={0}
        name="Общие датчики"
        cluster_detectors={detectorData}
      />
    </STransfer>
  );
};

export default memo(ControlTransfer);
