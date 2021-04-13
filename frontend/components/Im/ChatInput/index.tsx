import React, { memo, useState } from "react";
import { Wrapper, Inner, Button, Input } from "./styles";
interface ChatAddProps {
  handleSubmit: (content: string) => void;
}

const ChatAddComponent = ({ handleSubmit }: ChatAddProps) => {
  const [value, setValue] = useState("");

  return (
    <Wrapper>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            content: { value: string };
          };
          const content = target.content.value;
          if (content.trim() !== "") {
            handleSubmit(content);
            setValue("");
          }
        }}
      >
        <Inner>
          <Input
            name="content"
            placeholder="Введите сообщение"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit">
            <img src="/enter.svg" alt="Submit" />
          </Button>
        </Inner>
      </form>
    </Wrapper>
  );
};

export const ChatAdd = memo(ChatAddComponent);
