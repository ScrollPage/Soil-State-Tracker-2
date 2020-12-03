import Container from "@/components/UI/Container";
import Header from "@/components/Header";
import React, { useRef, useState, useEffect } from "react";
import Drower from "../Drower";
import { SLayout, SMain } from "./styles";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { authCheckState } from "@/store/actions/auth";
import ChatWidget from "@/components/ChatWidget";
import { messageActions, setMessages } from "@/store/actions/message";
import { IMessage, IMessages } from "@/types/message";
import WebSocketInstance from "@/websocket";
import { IProtection } from "@/types/protection";
import Pusher from "pusher-js";
import { getUser } from "@/utils.ts/getUser";
import { INotify } from "@/types/chat";
import {
  addNotifyChatMutate,
  readChatMutate,
  removeNotifyChatMutate,
} from "@/mutates/chat";
import { show } from "@/store/actions/alert";

interface ILayout {
  children: React.ReactNode;
  protection: IProtection;
}

const Layout: React.FC<ILayout> = ({ children, protection }) => {
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  let layout = useRef<HTMLDivElement>(null);

  const { userId } = getUser();

  useEffect(() => {
    // if (protection.isStaff) {
    const pusher = new Pusher("cd195d4bd07dc0db154b", {
      cluster: "eu",
      // @ts-ignore: Unreachable code error
      encrypted: true,
    });
    const channel = pusher.subscribe(`notifications${userId}`);
    const notifyUrl = "/api/notifications/";
    const chatUrl = "/api/chat/";
    channel.bind("new_chat", function (data: INotify) {
      addNotifyChatMutate(notifyUrl, data.chat, data.user_name);
      dispatch(show("Новый чат!", "success"));
    });
    channel.bind("chat_accepted", function (data: { chat: number }) {
      removeNotifyChatMutate(notifyUrl, data.chat);
      dispatch(show("Новый чат принял другой менеджер!", "success"));
    });
    channel.bind("new_message", function (data: { chat: number }) {
      readChatMutate(chatUrl, data.chat, true);
      dispatch(show("У вас новое сообщение!", "success"));
    });
    return () => {
      pusher.disconnect();
      // };
    };
  }, [userId]);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(layout.current, {
        duration: 0.8,
        css: {
          transform: "translateX(-280px)",
        },
        ease: "power3.inOut",
      });
    } else {
      gsap.to(layout.current, {
        duration: 0.6,
        css: {
          transform: "translateX(0px)",
        },
        ease: "power3.inOut",
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    dispatch(authCheckState());
    WebSocketInstance.addCallbacks(setMessagesHandler, addMessageHandler);
  }, []);

  const setMessagesHandler = (messages: IMessages) => {
    dispatch(setMessages(messages));
  };

  const addMessageHandler = (message: IMessage) => {
    dispatch(messageActions.addMessage(message));
  };

  return (
    <>
      <SLayout ref={layout}>
        <Header protection={protection} setMenuOpen={setMenuOpen} />
        <SMain>
          <Container>{children}</Container>
        </SMain>
      </SLayout>
      <Drower
        protection={protection}
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
      />
      {!protection.isStaff && <ChatWidget />}
    </>
  );
};

export default Layout;
