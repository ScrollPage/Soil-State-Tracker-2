import { instanceWithSSR } from "@/api";
import Control from "@/components/Control";
import { ICompany } from "@/types/company";
import { IDetector } from "@/types/detector";
import { IWorker } from "@/types/user";
import { getAsString } from "@/utils.ts/getAsString";
import { ensureAuth } from "@/utils.ts/ensure";
import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";

interface ICompanyPage {
  companyItem: ICompany | null;
  detectors: IDetector[] | null;
  workers: IWorker[] | null;
}

const CompanyPage = ({ companyItem, detectors, workers }: ICompanyPage) => {
  return (
    <SCompanyPage>
      {companyItem ? (
        <Control
          companyItem={companyItem}
          detectors={detectors}
          workers={workers}
        />
      ) : (
        <h1>Ошибка загрузки информации о компании</h1>
      )}
    </SCompanyPage>
  );
};

export default CompanyPage;

export const getServerSideProps: GetServerSideProps<ICompanyPage> = async (
  ctx
) => {
  ensureAuth(ctx);
  const companyId = getAsString(ctx?.params?.ID);
  let companyItem: ICompany | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/company/${companyId}/`)
    .then((response) => {
      companyItem = response?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  let detectors: IDetector[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/company/${companyId}/transfer_detectors/`)
    .then((response) => {
      detectors = response?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  let workers: IWorker[] | null = null;
  await instanceWithSSR(ctx)
    .get(`/api/company/${companyId}/workers/`)
    .then((response) => {
      workers = response?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      companyItem: companyItem || null,
      detectors: detectors || null,
      workers: workers || null,
    },
  };
};

const SCompanyPage = styled.div`
  display: flex;
`;
