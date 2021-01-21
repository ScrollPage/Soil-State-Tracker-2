import React, { Dispatch, memo, SetStateAction } from "react";
import { Wrapper, Arrow } from "./styles";

interface ipProps {
  id: number;
  name: string;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  isShow: boolean;
  onChoose: (id: number, kind: "detector" | "cluster") => void;
}

const TooltipComponent: React.FC<ipProps> = ({
  id,
  name,
  setIsShow,
  isShow,
  onChoose,
}) => {
  const showHandler = () => {
    chooseHandler();
    setIsShow((e) => !e);
  };

  const chooseHandler = () => {
    onChoose(id, "cluster");
  };

  return (
    <Wrapper>
      <span onClick={chooseHandler}>
        {id === 0 ? "Свободные датчики" : name}
      </span>
      <Arrow onClick={showHandler} isShow={isShow} />
    </Wrapper>
  );
};

export const ToolTip = memo(TooltipComponent);
