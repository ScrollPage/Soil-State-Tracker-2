import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Wrapper, Left, Right, Resize, Closable } from "./styles";

interface ResizePanelProps {
  children: React.ReactNode;
  leftMin?: number;
  rightMin?: number;
}

interface WidthType {
  left: number | null;
  right: number | null;
  main: number | null;
}

const ResizePanelComponent: React.FC<ResizePanelProps> = ({
  children,
  leftMin = 310,
  rightMin = 320,
}) => {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement[];

  const [isShow, setIsShow] = useState(true);
  const [delta, setDelta] = useState(0);
  const [inspectMouse, setInspectMouse] = useState(false);
  const [initial, setInitial] = useState<number | null>(null);
  const [width, setWidth] = useState<WidthType>({
    left: null,
    right: null,
    main: null,
  });
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

  const currentWidth = useMemo(() => (width.left ? width.left + delta : null), [
    width,
    delta,
  ]);

  const isChowClosable = useMemo(
    () => width.left && (width.left + delta === 310 || !isShow),
    [width, isShow]
  );

  return (
    <Wrapper>
      {isShow && (
        <Left leftMin={leftMin} ref={leftRef} width={currentWidth}>
          {childrenArray[0]}
        </Left>
      )}
      <Resize onMouseDown={mouseDownHandler} isActive={inspectMouse}>
        {isChowClosable && (
          <Closable isActive={isShow} onClick={showHandler}>
            {isShow ? "Закрыть" : "Открыть"}
          </Closable>
        )}
      </Resize>
      <Right rightMin={rightMin}>{childrenArray[1]}</Right>
    </Wrapper>
  );
};

export const ResizePanel = memo(ResizePanelComponent);
