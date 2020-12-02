import { INotify, IChat } from '@/types/chat';
import { mutate, trigger } from 'swr';

export const acceptChatMutate = (notifyUrl: string, chatUrl: string, chatId: number, userName: string) => {
  mutate(notifyUrl, async (notify: INotify[]) => {
    if (notify) {
      return notify.filter(item => item.chat !== chatId);
    }
  }, false);

  mutate(chatUrl, async (chats: IChat[]) => {
    if (chats) {
      return [...chats, {
        id: chatId,
        user_name: userName,
        is_read: true
      }];
    }
  }, false);
}

export const readChatMutate = async (chatUrl: string, chatId: number, isRead: boolean) => {
  await mutate(chatUrl, async (chats: IChat[]) => {
    if (chats) {
      console.log(JSON.stringify(chats.map(chat => {
        if (chat.id === chatId) {
          chat.is_read = isRead;
        }
        return chat;
      }), null, 2))

      return chats.map(chat => {
        if (chat.id === chatId) {
          chat.is_read = isRead;
        }
        return chat;
      })
    }
  }, false)
  trigger(chatUrl);
}

export const addNotifyChatMutate = async (notifyUrl: string, chatId: number, userName: string) => {
  await mutate(notifyUrl, async (notify: INotify[]) => {
    if (notify) {
      return [...notify, {
        chat: chatId,
        user_name: userName
      }]
    }
  }, false);
  trigger(notifyUrl);
}

export const removeNotifyChatMutate = async (notifyUrl: string, chatId: number) => {
  await mutate(notifyUrl, async (notify: INotify[]) => {
    if (notify) {
      return notify.filter(item => item.chat !== chatId);
    }
  }, false);
  trigger(notifyUrl);
}

