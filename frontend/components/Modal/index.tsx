import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getModalName, getModalProps } from "@/store/selectors";
import { modalHide } from "@/store/actions/modal";
import { StyledBackDrop, StyledRootModal } from "./styles";

import DeleteCompanyModal from "./DeleteCompanyModal";
import ChangeCompanyModal from "./ChangeCompanyModal";

const MODAL_COMPONENTS = {
  'DELETE_COMPANY_MODAL': DeleteCompanyModal,
  'CHANGE_COMPANY_MODAL': ChangeCompanyModal,
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
            <CloseOutlined />
          </div>
          <SpecificModal {...modalProps} setClose={setClose} />
        </div>
      </StyledRootModal>
      <StyledBackDrop onClick={() => setClose()} />
    </>
  );
};

export default RootModal;
