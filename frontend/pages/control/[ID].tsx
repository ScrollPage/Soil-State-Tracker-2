import ControlLayout from "@/components/Layout/ControlLayout";
import { ClusterContainer } from "@/containers/cluster";
import { ensureAuth } from "@/utils.ts/ensure";
import { getAsString } from "@/utils.ts/getAsString";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface ClusterPageProps {
  clusterId: string | undefined;
}

export default function ClusterPage({ clusterId }: ClusterPageProps) {
  return (
    <ControlLayout>
      <Head>
        <title>Управление группой</title>
      </Head>
      <ClusterContainer clusterId={clusterId} />
    </ControlLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ClusterPageProps> = async (
  ctx
) => {
  ensureAuth(ctx);
  const clusterId = getAsString(ctx?.params?.ID);
  return {
    props: { clusterId },
  };
};
