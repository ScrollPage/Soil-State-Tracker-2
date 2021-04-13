import { About } from "@/components/Landing/Footer/styles";
import { Avatar } from "@/components/UI/Avatar";
import { useUser } from "@/hooks/useUser";
import React from "react";
import {
  Wrapper,
  Title,
  Inner,
  Name,
  Edit,
  EditTitle,
  Info,
  Diagrams,
  Telegram,
  SubTitle,
  Value,
  SubValue,
  Card,
} from "./styles";

export const ProfileContainer = () => {
  const { firstName, lastName } = useUser();
  return (
    <Wrapper>
      <Title>Профиль</Title>
      <Inner>
        <About>
          <Avatar size={74} />
          <Name>
            {firstName} {lastName}
          </Name>
          <Edit>
            <img src="" alt="Редактировать профиль" />
            <EditTitle>Редактировать профиль</EditTitle>
          </Edit>
        </About>
      </Inner>
    </Wrapper>
  );
};
