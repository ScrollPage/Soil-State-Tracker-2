import { IDetectorDataModalProps } from "@/components/Modal/DetectorDataModal";
import { SButton } from "@/components/UI/Button";
import { modalShow } from "@/store/actions/modal";
import { IDetector } from "@/types/detector";
import Image from "next/image";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Field, ImgWrapper, Main } from "./styles";

const Detector: React.FC<IDetector> = ({ id, x, y }) => {
  const dispatch = useDispatch();

  const showHandler = () => {
    dispatch(
      modalShow<IDetectorDataModalProps>("DETECTOR_DATA_MODAL", { id })
    );
  };

  return (
    <Wrapper>
      <ImgWrapper>
        <Image src="/control/detector.png" height={70} width={70} />
      </ImgWrapper>
      <Main>
        <Field>id: {id}</Field>
        <Field>x: {x}</Field>
        <Field>y: {y}</Field>
        <SButton myType="blue" small onClick={showHandler}>
          Статистика
        </SButton>
      </Main>
    </Wrapper>
  );
};

export default memo(Detector);
