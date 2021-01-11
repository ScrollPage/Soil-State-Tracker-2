import React, { memo } from "react";
import { Wrapper, Title, GoBack, Content } from "./styles";
import Link from "next/link";
import Image from "next/image";

const AuthHeaderComponent = () => {
  return (
    <Wrapper>
      <Content>
        <Image height={84} width={114} src="/main/logo.svg" />
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
