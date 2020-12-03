import React from "react";
import { useDispatch } from "react-redux";
import {
  SDetectorDataModal,
  SDetectorDataModalBody,
  SDetectorDataModalTitle,
} from "./styles";
import useSWR from "swr";
import ErrorMessage from "@/components/UI/ErrorMessage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import EmptyMessage from "@/components/UI/EmptyMessage";

export interface IDetectorDataModalProps {
  id: number;
}

interface IDetectorDataModal extends IDetectorDataModalProps {
  setClose: () => void;
}

const DetectorDataModal: React.FC<IDetectorDataModal> = ({ id, setClose }) => {
  const { data, error } = useSWR(id ? `/api/detector/${id}/` : null);

  return (
    <SDetectorDataModal>
      {error && <ErrorMessage message="Ошибка вывода информации о датчике" />}
      {!data && !error && <LoadingSpinner />}
      {data?.length === 0 && (
        <EmptyMessage message="Нет информации по датчику" />
      )}

      <SDetectorDataModalTitle>Информация о датчике</SDetectorDataModalTitle>
      <h1>{id}</h1>
    </SDetectorDataModal>
  );
};

export default DetectorDataModal;
