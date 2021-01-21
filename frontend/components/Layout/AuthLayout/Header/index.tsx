import React, { memo } from "react";
import { Wrapper, Title, GoBack, Content } from "./styles";
import Link from "next/link";

const AuthHeaderComponent = () => {
  return (
    <Wrapper>
      <Content>
        <Title>
          <Link href="/">
            <a>LoRaWAN Dam</a>
          </Link>
        </Title>
      </Content>
      <GoBack>
        <Link href="/">
          <a>Вернуться на главную</a>
        </Link>
      </GoBack>
    </Wrapper>
  );
};

export const AuthHeader = memo(AuthHeaderComponent);
