import React, { useState } from "react";
import { Chat } from "../Chat";
import { Wrapper, Button } from "./styles";

export const ChatOpen = () => {
  const [open, setOpen] = useState(false);
  return (
    <Wrapper>
      {open ? (
        <Chat onClose={() => setOpen(false)} />
      ) : (
        <Button onClick={() => setOpen(true)}>
          <img src="./chat/open.svg" alt="Поддержка" />
        </Button>
      )}
    </Wrapper>
  );
};
