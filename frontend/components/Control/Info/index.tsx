import { Chart } from "@/components/Chart";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { useChooseContext } from "@/context/control";
import React, { memo, useMemo, useState } from "react";
import useSWR from "swr";
import { Wrapper, Title, Header, DateWrapper, Footer, Text } from "./styles";
import { DatePicker } from "antd";
import { Select } from "antd";
import { Case } from "../Case";
import { caseOptions } from "@/someData/caseData";
import { IDetectorData } from "@/types/detector";
import moment from "moment";
import { SButton } from "@/components/UI/Button";
import { useDispatch } from "react-redux";
import { modalShow } from "@/store/actions/modal";
import { IDeleteClusterModalProps } from "@/components/Modal/DeleteClusterModal";

const { Option } = Select;

const renderCases = (data: IDetectorData[]) => {
  return caseOptions.map((item, index) => {
    return (
      <Case key={`case__key__${index}__${item.label}`} label={item.label}>
        <Chart label={item.label} value={item.value} detectorData={data} />
      </Case>
    );
  });
};

const InfoComponent = () => {
  const dispatch = useDispatch();
  const { id, kind, title, choose } = useChooseContext();
  const [date, setDate] = useState("2021-01-20");
  const [currency, setCurrency] = useState("1");

  const chooseApi = useMemo(
    () =>
      id
        ? kind === "detector"
          ? `/api/detector/${id}/?begin_date=${date}&currency=${currency}`
          : `/api/cluster/${id}/data?begin_date=${date}&currency=${currency}`
        : "",
    [id, kind, date, currency]
  );

  const infoTitle = useMemo(
    () => (kind === "detector" ? "Датчик " : "Кластер ") + id,
    [kind, id]
  );

  const { data, error } = useSWR(chooseApi);

  const onChange = (date: any, dateString: string) => {
    setDate(dateString);
  };

  const handleChange = (value: string) => {
    setCurrency(value);
  };

  const showHandler = () => {
    if (id) {
      dispatch(
        modalShow<IDeleteClusterModalProps>("DELETE_CLUSTER_MODAL", {
          id,
          onChoose: () => {
            choose(0, "cluster", null);
          },
        })
      );
    }
  };

  if (!id) {
    return (
      <Wrapper>
        <EmptyMessage message="Выберите Датчик или Кластер для просмотра информации" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header>
        <Title>{infoTitle}</Title>
        <DateWrapper>
          <DatePicker
            format={"YYYY-MM-DD"}
            onChange={onChange}
            defaultValue={moment(date, "YYYY-MM-DD")}
          />
          <Select
            defaultValue="1"
            placeholder="Выберите частоту"
            onChange={handleChange}
            style={{ width: "148px", marginTop: "10px" }}
          >
            <Option value="1">День</Option>
            <Option value="7">Неделя</Option>
            <Option value="30">Месяц</Option>
          </Select>
        </DateWrapper>
      </Header>
      {error && <ErrorMessage message="Ошибка вывода информации о датчике" />}
      {!data && !error && <LoadingSpinner />}
      {data?.length === 0 && (
        <EmptyMessage message={`Нет информации по ${infoTitle}`} />
      )}
      {!error && data?.length !== 0 && data && (
        <>
          {renderCases(data)}
          {kind === "cluster" && (
            <Case label="Описание">
              <Text>{title === "" ? "отсутствует" : title}</Text>
            </Case>
          )}
        </>
      )}
      <Footer>
        <SButton myType="green">Редактировать</SButton>
        <SButton onClick={showHandler} myType="red" />
      </Footer>
    </Wrapper>
  );
};

export const Info = memo(InfoComponent);
