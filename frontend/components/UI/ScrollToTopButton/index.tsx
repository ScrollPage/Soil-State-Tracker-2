import { useScroll } from "@/hooks/useScroll";
import React, { memo, useEffect, useState } from "react";
import { SButton } from "../Button";
import { Wrapper } from "./styles";

const SctollToTopButtonComponent = () => {
  const scroll = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (scroll > 600) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [scroll]);

  const scrollToTop = () => window.scroll({ top: 0, behavior: "smooth" });

  if (!visible) {
    return null;
  }

  return (
    <Wrapper onClick={scrollToTop}>
      <SButton small myType="orange">
        Наверх
      </SButton>
    </Wrapper>
  );
};

export const SctollToTopButton = memo(SctollToTopButtonComponent);
