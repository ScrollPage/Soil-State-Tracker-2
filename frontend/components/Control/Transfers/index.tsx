import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ControlContext, ControlProps } from "@/pages/control";
import React, { memo, useContext } from "react";
import useSWR from "swr";
import { Cluster } from "../Cluster";
import { Wrapper } from "./styles";

interface TransferProps {}

const TransfersComponent: React.FC<TransferProps> = () => {
  const { detectors } = useContext(ControlContext) as ControlProps;

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
      <Cluster
        id={0}
        name="Мои датчики"
        cluster_detectors={detectorData}
        title={null}
      />
    </Wrapper>
  );
};

export const Transfers = memo(TransfersComponent);
