import React, { memo, useCallback, useState } from "react";
import {
  Closeable,
  Wrapper,
  TransferWrapper,
  ClusterWrapper,
  Inner,
} from "./styles";
import { Transfers } from "@/components/Control/Transfers";
import { Clusters } from "@/components/Control/Clusters";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Add } from "@/components/Control/Add";

interface SideBarProps {}

const SideBarContainer: React.FC<SideBarProps> = () => {
  const [isShow, setIsShow] = useState(true);
  const [height, setHeight] = useState<null | number>(null);

  const showHandler = () => {
    setIsShow((e) => !e);
  };

  const wrapperRef = useCallback((node) => {
    if (node !== null) {
      if (isShow) {
        setHeight(node.getBoundingClientRect().height);
      }
      console.log(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <Wrapper>
      <Inner>
        <DndProvider backend={HTML5Backend}>
          <TransferWrapper>
            <Transfers />
          </TransferWrapper>
          <ClusterWrapper>
            <Clusters />
            <Add />
          </ClusterWrapper>
        </DndProvider>
      </Inner>
      {/* <Closeable
        ref={wrapperRef}
        height={!isShow ? height : null}
        onClick={showHandler}
      >
        {isShow ? <p>&#9668;</p> : <p>&#9658;</p>}
      </Closeable> */}
    </Wrapper>
  );
};

export const SideBar = memo(SideBarContainer);
