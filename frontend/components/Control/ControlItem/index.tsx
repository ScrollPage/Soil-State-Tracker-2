import { IDetector } from "@/types/detector";
import { ItemTypes } from "@/utils.ts/items";
import Image from "next/image";
import React, { memo } from "react";
import { useDrag } from "react-dnd";
import { Wrapper, Text } from "./styles";

const ControlItem: React.FC<IDetector & { clusterId: number }> = ({
  clusterId,
  id,
  x,
  y,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.Item,
      from: clusterId,
      id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <Wrapper ref={drag} isDragging={isDragging}>
        <Image src="/control/detector.png" height={70} width={70} />
        <Text>
          <span>id:</span>&nbsp;
          {id}
        </Text>
      </Wrapper>
    </>
  );
};

export default memo(ControlItem);
