import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModalName, getModalProps } from "@/store/selectors";
import { modalHide } from "@/store/actions/modal";
import { StyledBackDrop, StyledRootModal } from "./styles";

import DetectorDataModal from "./DetectorDataModal";

const MODAL_COMPONENTS = {
  DETECTOR_DATA_MODAL: DetectorDataModal,
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
      <StyledRootModal>
        <div>
          <div className="root-modal__close" onClick={() => setClose()}>
            Close
          </div>
          <SpecificModal {...modalProps} setClose={setClose} />
        </div>
      </StyledRootModal>
      <StyledBackDrop onClick={() => setClose()} />
    </>
  );
};

export default RootModal;
