import React, { memo } from "react";
import { Wrapper, Title } from "./styles";
import useSWR from "swr";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { Chart } from "@/components/Chart";

export interface IDetectorDataModalProps {
  id?: number;
  clusterId?: string;
}

interface IDetectorDataModal extends IDetectorDataModalProps {
  setClose: () => void;
}

const DetectorDataModalComponent: React.FC<IDetectorDataModal> = ({
  id,
  setClose,
  clusterId,
}) => {
  const { data, error } = useSWR(
    id
      ? `/api/detector/${id}/`
      : clusterId
      ? `/api/cluster/${clusterId}/data/`
      : null
  );

  return (
    <Wrapper>
      <Title>Информация о датчике</Title>
      {error && <ErrorMessage message="Ошибка вывода информации о датчике" />}
      {!data && !error && <LoadingSpinner />}
      {data?.length === 0 && (
        <EmptyMessage message="Нет информации по датчику" />
      )}
      {data && <Chart detectorData={data} />}
    </Wrapper>
  );
};

export const DetectorDataModal = memo(DetectorDataModalComponent);
