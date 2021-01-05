import React, { useEffect } from "react";
import { emailActivate } from "@/store/actions/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Wrapper, Title, SubTitle } from "./styles";

interface AccountActivationContainerProps {
  token: string | null;
}

export const AccountActivationContainer: React.FC<AccountActivationContainerProps> = ({
  token,
}) => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  useEffect(() => {
    if (token) {
      dispatch(emailActivate(token));
    }
  }, [token]);

  useEffect(() => {
    setTimeout(() => {
      push({ pathname: "/login" }, undefined, {
        shallow: true,
      });
    }, 3000);
  }, []);
  return (
    <Wrapper>
      <Title>Активация аккаунта</Title>
      <SubTitle>
        Через 3 секунды вы будете перенаправлены на страницу входа
      </SubTitle>
    </Wrapper>
  );
};
