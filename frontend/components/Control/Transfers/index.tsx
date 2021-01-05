import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { IDetector } from "@/types/detector";
import React, { memo } from "react";
import useSWR from "swr";
import Cluster from "../Cluster";
import { Wrapper, Title } from "./styles";

interface TransferProps {
  detectors: IDetector[] | null;
}

const Transfers: React.FC<TransferProps> = ({ detectors }) => {
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
      <Title>Мои датчики</Title>
      <Cluster id={0} name="Мои датчики" cluster_detectors={detectorData} />
    </Wrapper>
  );
};

export default memo(Transfers);
