import { instanceWithSSR } from "@/api";
import { ClusterDetector } from "@/components/Cluster/ClusterDetector";
import ControlLayout from "@/components/Layout/ControlLayout";
import { IDetectorDataModalProps } from "@/components/Modal/DetectorDataModal";
import { SButton } from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import EmptyMessage from "@/components/UI/EmptyMessage";
import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { modalShow } from "@/store/actions/modal";
import { IDetector } from "@/types/detector";
import { ensureAuth } from "@/utils.ts/ensure";
import { getAsString } from "@/utils.ts/getAsString";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSWRInfinite } from "swr";

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

interface IClusterPage {
  clusterId: string | undefined;
}

export default function ClusterPage({ clusterId }: IClusterPage) {
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
    <ControlLayout>
      <Container>
        <Wrapper>
          <Head>
            <title>Управление группой</title>
          </Head>
          <Header>
            <Title>{data?.[0]?.[0]?.cluster}</Title>
            <SButton onClick={showHandler} myType="blue">
              Статистика по кластеру
            </SButton>
          </Header>
          <Main>
            {error && <ErrorMessage message="Ошибка вывода датчиков" />}
            {!data && !error && <LoadingSpinner />}
            {data?.[0]?.length === 0 && (
              <EmptyMessage message="В данной группе нет датчиков" />
            )}
            {data && renderCluster(data)}
          </Main>
          <NextPage>
            <SButton
              disabled={size >= maxSize || data?.[0]?.length === 0}
              myType="blue"
              onClick={sizeHandler}
            >
              Загрузить еще
            </SButton>
          </NextPage>
        </Wrapper>
      </Container>
    </ControlLayout>
  );
}

export const getServerSideProps: GetServerSideProps<IClusterPage> = async (
  ctx
) => {
  // ensureAuth(ctx);
  const clusterId = getAsString(ctx?.params?.ID);

  // let detectors: IDetector[] | null = null;
  // await instanceWithSSR(ctx)
  //   .get(`/api/cluster/${clusterId}/`)
  //   .then((response) => {
  //     detectors = response?.data;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  return {
    props: { clusterId },
  };
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 80px 80px 80px;
  @media (max-width: 1199.98px) {
    padding: 0px 30px 80px 30px;
  }
  @media (max-width: 767.98px) {
    padding: 0px 0px 80px 0px;
  }
`;

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
`;

const Title = styled.h1`
  margin-top: 69px;
  font-family: Play;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  color: #000000;
`;

const NextPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
