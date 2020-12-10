import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModalName, getModalProps } from "@/store/selectors";
import { modalHide } from "@/store/actions/modal";
import { BackDrop, Wrapper, Close } from "./styles";

import DetectorDataModal from "./DetectorDataModal";
import AddClusterModal from "./AddClusterModal";

const MODAL_COMPONENTS = {
  DETECTOR_DATA_MODAL: DetectorDataModal,
  ADD_CLUSTER_MODAL: AddClusterModal,
};

const RootModal: React.FC = () => {
  const dispatch = useDispatch();

  const modalProps = useSelector(getModalProps);
  const modalName = useSelector(getModalName);

  const setClose = () => {
    dispatch(modalHide());
  };

  if (!modalName) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalName];

  return (
    <>
      <Wrapper>
        <div>
          <Close onClick={setClose} />
          <SpecificModal {...modalProps} setClose={setClose} />
        </div>
      </Wrapper>
      <BackDrop onClick={() => setClose()} />
    </>
  );
};

export default RootModal;
