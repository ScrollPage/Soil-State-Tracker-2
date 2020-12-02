import { IMessage } from "@/types/message";
import { renderTimestamp } from "@/utils.ts/renderTimestamp";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import {
  SChatMessage,
  SChatMessageAvatar,
  SChatMessageInner,
  SChatMessageDescr,
  SChatMessageContent,
} from "./styles";

interface IChatMessage {
  message: IMessage;
}

const ChatMessage: React.FC<IChatMessage> = ({ message }) => {
  return (
    <SChatMessage>
      <SChatMessageAvatar>
        <div>
          <UserOutlined />
        </div>
      </SChatMessageAvatar>
      <SChatMessageInner>
        <SChatMessageDescr>
          <p>{message.full_name}</p>
          <small>{renderTimestamp(message.timestamp)}</small>
        </SChatMessageDescr>
        <SChatMessageContent>{message.content}</SChatMessageContent>
      </SChatMessageInner>
    </SChatMessage>
  );
};

export default ChatMessage;
