import { useChooseContext } from "@/context/control";
import { IDetector } from "@/types/detector";
import { ItemTypes } from "@/utils.ts/items";
import React, { memo, useMemo } from "react";
import { useDrag } from "react-dnd";
import { Wrapper, Text } from "./styles";

const ControlItemComponent: React.FC<IDetector & { clusterId: number }> = ({
  clusterId,
  id,
  x,
  y,
}) => {
  const { choose, id: chooseId, kind } = useChooseContext();

  const chooseHandler = () => {
    choose(id, "detector");
  };

  const isChoose = useMemo(() => id === chooseId && kind === "detector", [
    chooseId,
    kind,
  ]);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.Item,
      from: clusterId,
      detector: {
        id,
        x,
        y,
      },
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <Wrapper
        onClick={chooseHandler}
        ref={drag}
        isDragging={isDragging}
        data-testid="controlItem"
        isChoose={isChoose}
      >
        <Text>
          <span>Детектор -</span>&nbsp;{id}
        </Text>
      </Wrapper>
    </>
  );
};

export const ControlItem = memo(ControlItemComponent);
