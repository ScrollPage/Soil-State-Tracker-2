import React, { memo } from "react";
import { Wrapper, Inner, Footer } from "./styles";
import { Transfers } from "@/components/Control/Transfers";
import { Clusters } from "@/components/Control/Clusters";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IAddClusterModalProps } from "@/components/Modal/AddClusterModal";
import { SButton } from "@/components/UI/Button";
import { modalShow } from "@/store/actions/modal";
import { useDispatch } from "react-redux";

interface SideBarProps {}

const SideBarContainer: React.FC<SideBarProps> = () => {
  const dispatch = useDispatch();

  const showHandler = () => {
    dispatch(modalShow<IAddClusterModalProps>("ADD_CLUSTER_MODAL", {}));
  };

  return (
    <Wrapper>
      <Inner>
        <DndProvider backend={HTML5Backend}>
          <Transfers />
          <Clusters />
          <Footer>
            <SButton myType="green" onClick={showHandler}>
              Добавить кластер
            </SButton>
          </Footer>
        </DndProvider>
      </Inner>
    </Wrapper>
  );
};

export const SideBar = memo(SideBarContainer);
