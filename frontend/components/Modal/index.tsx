import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModalInfo } from "@/store/selectors";
import { modalHide } from "@/store/actions/modal";
import { BackDrop, Wrapper, Close } from "./styles";

import { AddClusterModal } from "./AddClusterModal";
import { DeleteClusterModal } from "./DeleteClusterModal";

const MODAL_COMPONENTS = {
  ADD_CLUSTER_MODAL: AddClusterModal,
  DELETE_CLUSTER_MODAL: DeleteClusterModal
};

const RootModalComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { props, name } = useSelector(getModalInfo);

  const setClose = () => {
    dispatch(modalHide());
  };

  useEffect(() => {
    if (name) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [name]);

  if (!name) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[name];

  return (
    <>
      <Wrapper>
        <div>
          <Close onClick={setClose} />
          <SpecificModal {...props} setClose={setClose} />
        </div>
      </Wrapper>
      <BackDrop onClick={() => setClose()} />
    </>
  );
};

export const RootModal = memo(RootModalComponent);
