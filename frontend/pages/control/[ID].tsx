import { instanceWithSSR } from "@/api";
import { ClusterDetector } from "@/components/Cluster/ClusterDetector";
import { SButton } from "@/components/UI/Button";
import EmptyMessage from "@/components/UI/EmptyMessage";
import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { IDetector } from "@/types/detector";
import { ensureAuth } from "@/utils.ts/ensure";
import { getAsString } from "@/utils.ts/getAsString";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import { useSWRInfinite } from "swr";

const renderCluster = (data: IDetector[][]) => {
  return data.map((part) =>
    part.map((detector) => (
      <ClusterDetector
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
  const getKey = (pageIndex: number, previousPageData: IDetector[] | null) => {
    if (previousPageData && !previousPageData?.length) return null;
    return `/api/cluster/${clusterId}/?page=${pageIndex + 1}`;
  };

  const maxSize = 3;

  const { data, size, setSize, error } = useSWRInfinite<IDetector[]>(getKey);

  const sizeHandler = () => {
    if (size < maxSize) {
      setSize(size + 1);
    }
  };

  return (
    <SClusterPage>
      <Head>
        <title>Группа</title>
      </Head>
      <SClusterPageTitle>Кластер 1</SClusterPageTitle>
      <SClusterContainer>
        {error && <ErrorMessage message="Ошибка вывода датчиков" />}
        {!data && !error && <LoadingSpinner />}
        {data?.[0]?.length === 0 && (
          <EmptyMessage message="В данной группе нет датчиков" />
        )}
        {data && renderCluster(data)}
      </SClusterContainer>
      <SClusterPageBottom>
        <SButton
          disabled={size >= maxSize || data?.[0]?.length === 0}
          onClick={sizeHandler}
          width="200px"
        >
          Загрузить еще
        </SButton>
      </SClusterPageBottom>
    </SClusterPage>
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

const SClusterPage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 60px 0;
`;

const SClusterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SClusterPageTitle = styled.h1`
  margin-top: 0px;
  text-align: center;
`;

const SClusterPageBottom = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
