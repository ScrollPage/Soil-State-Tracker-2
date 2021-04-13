import { useEffect } from "react";
import { messageActions, setMessages } from "@/store/actions/message";
import WebSocketInstance from "@/websocket";
import { IMessage } from "@/types/message";
import { useDispatch } from "react-redux";

export const useSetupWebsokets = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    WebSocketInstance.addCallbacks(setMessagesHandler, addMessageHandler);
  }, []);

  const setMessagesHandler = (messages: IMessage[]) => {
    dispatch(setMessages(messages));
  };

  const addMessageHandler = (message: IMessage) => {
    dispatch(messageActions.addMessage(message));
  };
}