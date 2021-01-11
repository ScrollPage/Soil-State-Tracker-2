import { SButton } from "@/components/UI/Button";
import { IDetector } from "@/types/detector";
import Image from "next/image";
import React, { memo } from "react";
import { Wrapper, Field, ImgWrapper, Main } from "./styles";

interface DetectorProps {
  detector: IDetector;
  showHandler: (id: number) => void;
}

const DetectorComponent: React.FC<DetectorProps> = ({
  detector,
  showHandler,
}) => {
  return (
    <Wrapper>
      <ImgWrapper>
        <Image src="/control/detector.png" height={70} width={70} />
      </ImgWrapper>
      <Main>
        <Field>id: {detector.id}</Field>
        <Field>x: {detector.x}</Field>
        <Field>y: {detector.y}</Field>
        <SButton myType="blue" small onClick={() => showHandler(detector.id)}>
          Статистика
        </SButton>
      </Main>
    </Wrapper>
  );
};

export const Detector = memo(DetectorComponent);
