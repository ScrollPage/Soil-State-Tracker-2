import React, { memo, useState } from "react";
import { Wrapper, Title, Main, Header, Arrow } from "./styles";

interface CaseProps {
  label: string;
  children: React.ReactNode;
}

const CaseComponent: React.FC<CaseProps> = ({ label, children }) => {
  const [isShow, setIsShow] = useState(false);

  const showHandler = () => {
    setIsShow((e) => !e);
  };

  return (
    <Wrapper>
      <Header>
        <Title>{label}</Title>
        <Arrow onClick={showHandler} isShow={isShow} />
      </Header>
      {isShow && <Main>{children}</Main>}
    </Wrapper>
  );
};

export const Case = memo(CaseComponent);
