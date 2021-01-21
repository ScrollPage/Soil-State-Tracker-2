import React, { useEffect, useRef, useState } from "react";
import Container from "@/components/UI/Container";
import { Wrapper, Title, Main, Left, Right, Resize, Closable } from "./styles";
import { SideBar } from "@/components/Control/SideBar/index.";
import ChooseProvider from "@/context/control";
import { Info } from "@/components/Control/Info/index";

interface ControlContainerProps {}

export const ControlContainer: React.FC<ControlContainerProps> = ({}) => {
  const [isShow, setIsShow] = useState(true);
  const [delta, setDelta] = useState(0);
  const [inspectMouse, setInspectMouse] = useState(false);
  const [initial, setInitial] = useState<number | null>(null);
  const [width, setWidth] = useState<{
    left: number | null;
    right: number | null;
    main: number | null;
  }>({ left: null, right: null, main: null });
  const leftRef = useRef<HTMLDivElement>(null);

  const mouseDownHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isShow) {
      setInitial(event.clientX - delta);
      setInspectMouse(true);
    }
  };

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      if (initial) {
        setDelta(e.x - initial);
      }
    };
    const mouseUpHandler = (e: any) => {
      setInspectMouse(false);
    };
    if (inspectMouse) {
      addEventListener("mouseup", mouseUpHandler, false);
      addEventListener("mousemove", mouseMoveHandler, false);
    }
    return () => {
      removeEventListener("mouseup", mouseUpHandler, false);
      removeEventListener("mousemove", mouseMoveHandler, false);
    };
  }, [inspectMouse]);

  useEffect(() => {
    if (leftRef.current) {
      const offsetWidth = leftRef.current.offsetWidth;
      setWidth((e) => ({ ...e, left: offsetWidth }));
      setDelta(0);
    }
  }, [leftRef, inspectMouse]);

  const showHandler = () => {
    setIsShow((e) => !e);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Управление</Title>
        <ChooseProvider>
          <Main>
            {isShow && (
              <Left
                ref={leftRef}
                width={width.left ? width.left + delta : null}
              >
                <SideBar />
              </Left>
            )}
            <Resize onMouseDown={mouseDownHandler} isActive={inspectMouse}>
              {width.left && (width.left + delta === 300 || !isShow) && (
                <Closable isActive={isShow} onClick={showHandler}>
                  {isShow ? "Закрыть" : "Открыть"}
                </Closable>
              )}
            </Resize>
            <Right>
              <Info />
            </Right>
          </Main>
        </ChooseProvider>
      </Wrapper>
    </Container>
  );
};
