import React, { memo } from "react";
import { Wrapper, Title, GoBack, Content } from "./styles";
import Link from "next/link";
import { useMaxWidth } from "@/hooks/useMaxWidth";

const AuthHeaderComponent = () => {
  const isShow = useMaxWidth(767.98);

  return (
    <Wrapper>
      <Content>
        <Title>
          <Link href="/">
            <a>{isShow ? "LWD" : "LoRaWAN Dam"}</a>
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
