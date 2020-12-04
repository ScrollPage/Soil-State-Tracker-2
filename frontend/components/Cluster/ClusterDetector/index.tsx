import { IDetectorDataModalProps } from "@/components/Modal/DetectorDataModal";
import { SButton } from "@/components/UI/Button";
import { modalShow } from "@/store/actions/modal";
import { IDetector } from "@/types/detector";
import React from "react";
import { useDispatch } from "react-redux";
import { SClusterDetector } from "./styles";

export const ClusterDetector: React.FC<IDetector> = ({ id, x, y }) => {
  const dispatch = useDispatch();

  const showHandler = () => {
    dispatch(
      modalShow<IDetectorDataModalProps>("DETECTOR_DATA_MODAL", { id })
    );
  };

  return (
    <SClusterDetector>
      <h3>id: {id}</h3>
      <h3>x: {x}</h3>
      <h3>y: {y}</h3>
      <SButton onClick={showHandler}>Информация</SButton>
    </SClusterDetector>
  );
};
