import React from "react";
import ClusterDetector from "@/components/Cluster/Detector";
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

const renderCluster = (detectors: IDetector[]) => {
  return detectors.map((detector) => (
    <ClusterDetector
      cluster={detector.cluster}
      key={`clusterDetector__key__${detector.id}`}
      id={detector.id}
      x={detector.x}
      y={detector.y}
    />
  ));
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

  const PAGE_SIZE = 5;

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/api/cluster/${clusterId}/?page=${pageIndex + 1}`;
  };

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    getKey
  );

  const detectors: IDetector[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      (data[data.length - 1]?.length < PAGE_SIZE ||
        (data[data.length - 1]?.length === PAGE_SIZE && false)));
  // const isRefreshing = isValidating && data && data.length === size;

  console.log(data);

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>{data?.[0]?.[0]?.cluster}</Title>
          {!isEmpty && (
            <SButton onClick={showHandler} myType="blue">
              Статистика по кластеру
            </SButton>
          )}
        </Header>
        <Main>
          {error && <ErrorMessage message="Ошибка вывода датчиков" />}
          {isLoadingInitialData && <LoadingSpinner />}
          {isEmpty && <EmptyMessage message="В данной группе нет датчиков" />}
          {renderCluster(detectors)}
        </Main>
        {!isEmpty && (
          <NextPage>
            <SButton
              disabled={isLoadingMore || isReachingEnd}
              myType="blue"
              onClick={() => setSize(size + 1)}
            >
              {isLoadingMore
                ? "Загрузка..."
                : isReachingEnd
                ? "Больше нет"
                : "Загрузить еще"}
            </SButton>
          </NextPage>
        )}
      </Wrapper>
    </Container>
  );
};
