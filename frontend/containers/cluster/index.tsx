import React from "react";
import { ClusterDetector } from "@/components/Cluster/ClusterDetector";
import { SButton } from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import EmptyMessage from "@/components/UI/EmptyMessage";
import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { IDetector } from "@/types/detector";
import { modalShow } from "@/store/actions/modal";
import { IDetectorDataModalProps } from "@/components/Modal/DetectorDataModal";
import { useDispatch } from "react-redux";
import { useSWRInfinite } from "swr";
import { Wrapper, Title, Main, Header, NextPage } from "./styles";

const renderCluster = (data: IDetector[][]) => {
  return data.map((part) =>
    part.map((detector) => (
      <ClusterDetector
        cluster={detector.cluster}
        key={`clusterDetector__key__${detector.id}`}
        id={detector.id}
        x={detector.x}
        y={detector.y}
      />
    ))
  );
};

interface ClusterContainerProps {
  clusterId: string | undefined;
}

export const ClusterContainer: React.FC<ClusterContainerProps> = ({
  clusterId,
}) => {
  const dispatch = useDispatch();

  const showHandler = () => {
    if (clusterId) {
      dispatch(
        modalShow<IDetectorDataModalProps>("DETECTOR_DATA_MODAL", {
          clusterId,
          id: null,
        })
      );
    }
  };

  const getKey = (pageIndex: number, previousPageData: IDetector[] | null) => {
    if (previousPageData && !previousPageData?.length) return null;
    return `/api/cluster/${clusterId}/?page=${pageIndex + 1}`;
  };

  const maxSize = 2;

  const { data, size, setSize, error } = useSWRInfinite<IDetector[]>(getKey);

  const sizeHandler = () => {
    if (size < maxSize) {
      setSize(size + 1);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>{data?.[0]?.[0]?.cluster}</Title>
          {data && data?.[0]?.length !== 0 && (
            <SButton onClick={showHandler} myType="blue">
              Статистика по кластеру
            </SButton>
          )}
        </Header>
        <Main>
          {error && <ErrorMessage message="Ошибка вывода датчиков" />}
          {!data && !error && <LoadingSpinner />}
          {data?.[0]?.length === 0 && (
            <EmptyMessage message="В данной группе нет датчиков" />
          )}
          {data && renderCluster(data)}
        </Main>
        {data && data?.[0]?.length !== 0 && (
          <NextPage>
            <SButton
              disabled={size >= maxSize || data?.[0]?.length === 0}
              myType="blue"
              onClick={sizeHandler}
            >
              Загрузить еще
            </SButton>
          </NextPage>
        )}
      </Wrapper>
    </Container>
  );
};
