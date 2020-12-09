import { IDetectorDataModalProps } from "@/components/Modal/DetectorDataModal";
import { SButton } from "@/components/UI/Button";
import { modalShow } from "@/store/actions/modal";
import { IDetector } from "@/types/detector";
import React from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Field } from "./styles";

export const ClusterDetector: React.FC<IDetector> = ({ id, x, y }) => {
  const dispatch = useDispatch();

  const showHandler = () => {
    dispatch(
      modalShow<IDetectorDataModalProps>("DETECTOR_DATA_MODAL", { id })
    );
  };

  return (
    <Wrapper>
      <Field>id: {id}</Field>
      <Field>x: {x}</Field>
      <Field>y: {y}</Field>
      <SButton myType="blue" small onClick={showHandler}>
        Информация
      </SButton>
    </Wrapper>
  );
};
