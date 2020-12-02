import { SButton } from "@/components/UI/Button";
import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";
import { SChatInput } from "./styles";

interface IChatInput {
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  messageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message: string;
}

const ChatInput: React.FC<IChatInput> = ({
  sendMessage,
  messageChange,
  message,
}) => {
  return (
    <SChatInput>
      <form onSubmit={sendMessage}>
        <div>
          <Input onChange={(e) => messageChange(e)} value={message} />
        </div>
        <div>
          <SButton htmlType="submit" height={"31.6"}>
            <SendOutlined />
          </SButton>
        </div>
      </form>
    </SChatInput>
  );
};

export default ChatInput;
