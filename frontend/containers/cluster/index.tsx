import React from "react";
import { Detector } from "@/components/Cluster/Detector";
import { SButton } from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { IDetector } from "@/types/detector";
import { modalShow } from "@/store/actions/modal";
import { useDispatch } from "react-redux";
import { useSWRInfinite } from "swr";
import { Wrapper, Title, Main, Header, NextPage } from "./styles";

const renderCluster = (
  detectors: IDetector[],
  openModal: (id: number) => void
) => {
  return detectors.map((detector) => (
    <Detector
      key={`Detector__key__${detector.id}`}
      detector={detector}
      showHandler={openModal}
    />
  ));
};

interface ClusterContainerProps {
  clusterId: string | undefined;
}

export const ClusterContainer: React.FC<ClusterContainerProps> = ({
  clusterId,
}) => {
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
        </Header>
        <Main>
          {error && <ErrorMessage message="Ошибка вывода датчиков" />}
          {isLoadingInitialData && <LoadingSpinner />}
          {isEmpty && <EmptyMessage message="В данной группе нет датчиков" />}
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
