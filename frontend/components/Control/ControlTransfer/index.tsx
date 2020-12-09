import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { IDetector } from "@/types/detector";
import React, { memo } from "react";
import useSWR from "swr";
import ControlClusterItem from "../ControlClusterItem";
import { Wrapper } from "./styles";

interface ControlTransferProps {
  detectors: IDetector[] | null;
}

const ControlTransfer: React.FC<ControlTransferProps> = ({ detectors }) => {
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
    <Wrapper>
      <ControlClusterItem
        id={0}
        name="Мои датчики"
        cluster_detectors={detectorData}
      />
    </Wrapper>
  );
};

export default memo(ControlTransfer);
