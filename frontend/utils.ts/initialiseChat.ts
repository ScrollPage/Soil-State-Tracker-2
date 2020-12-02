import WebSocketInstance from '@/websocket';

export const initialiseChat = (chatId: string, firstMessageCallback?: () => void): void => {
  waitForSocketConnection(() => {
    WebSocketInstance.fetchMessages(chatId);
    if (firstMessageCallback) {
      firstMessageCallback();
    }
  });
  WebSocketInstance.connect(chatId);
};

const waitForSocketConnection = (callback: () => void): void => {
  setTimeout(function () {
    if (WebSocketInstance.state() === 1) {
      console.log('Connection is made');
      callback();
    } else {
      console.log('wait for connection...');
      waitForSocketConnection(callback);
    }
  }, 100);
};