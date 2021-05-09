import Image from "next/image";
import React, { memo } from "react";
import Container from "@/components/UI/Container";
import {
  Wrapper,
  Info,
  Name,
  Title,
  SubTitle,
  Inner,
  AuthButtons,
  Menu,
  MenuItem,
  Auth,
  AuthTitle,
} from "./styles";
import { useDispatch } from "react-redux";
import { logout } from "@/store/actions/auth";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";

const MainHeaderComponent = () => {
  const dispatch = useDispatch();
  const { isAuth } = useUser();
  const { push } = useRouter();

  return (
    <Wrapper>
      <Container>
        <Inner>
          <Info>
            <Name>
              <Title>SightVI</Title>
              <Image height={25} width={40} src="/landing/eyeLogo.svg" />
            </Name>
            <SubTitle>Система мониторинга климата</SubTitle>
          </Info>
          <Menu>
            <MenuItem>Польза</MenuItem>
            <MenuItem>Стоимость</MenuItem>
            <MenuItem>FAQ</MenuItem>
            <MenuItem>Блог</MenuItem>
          </Menu>
          <Auth>
            <img src="/landing/zamok.svg" alt="Замок" />
            <AuthButtons>
              {isAuth ? (
                <>
                  <AuthTitle
                    onClick={() =>
                      push({ pathname: "/control" }, undefined, {
                        shallow: true,
                      })
                    }
                  >
                    Личный кабинет
                  </AuthTitle>
                  <AuthTitle onClick={() => dispatch(logout(true))}>
                    Выход
                  </AuthTitle>
                </>
              ) : (
                <>
                  <AuthTitle
                    onClick={() =>
                      push({ pathname: "/login" }, undefined, { shallow: true })
                    }
                  >
                    Вход
                  </AuthTitle>
                  <AuthTitle
                    onClick={() =>
                      push({ pathname: "/register" }, undefined, {
                        shallow: true,
                      })
                    }
                  >
                    Регистрация
                  </AuthTitle>
                </>
              )}
            </AuthButtons>
          </Auth>
        </Inner>
      </Container>
    </Wrapper>
  );
};

export const MainHeader = memo(MainHeaderComponent);
