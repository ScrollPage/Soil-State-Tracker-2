class WebSocketService {
	static instance = null;

	callbacks = {};

	static getInstance() {
		if (!WebSocketService.instance) {
			WebSocketService.instance = new WebSocketService();
		}
		return WebSocketService.instance;
	}

	constructor() {
		this.socketRef = null;
	}

	connect(chatUrl) {
		const path = `ws://127.0.0.1:8000/ws/chat/${chatUrl}/`;
		this.socketRef = new WebSocket(path);
		this.socketRef.onopen = () => {
			console.log('WebSocket open');
		};
		this.socketRef.onmessage = e => {
			this.socketNewMessage(e.data);
		};
		this.socketRef.onerror = e => {
			console.log(e.message);
		};
		this.socketRef.onclose = e => {
			if (e.wasClean) {
				console.log(`Соединение закрыто чисто, код=${e.code} причина=${e.reason}`);
			} else {
				console.log('Соединение прервано -> идет переподключение')
				this.connect(chatUrl);
			}
		};
	}

	disconnect() {
		this.socketRef.close();
	}

	socketNewMessage(data) {
		const parsedData = JSON.parse(data);
		const { command } = parsedData;
		if (Object.keys(this.callbacks).length === 0) {
			return;
		}
		if (command === 'messages') {
			this.callbacks[command](parsedData.messages);
		}
		if (command === 'new_message') {
			this.callbacks[command](parsedData.message);
		}
	}

	fetchMessages(userId) {
		this.sendMessage({
			command: 'fetch_messages',
			user: userId
		});
	}

	newChatMessage(message) {
		this.sendMessage({
			command: 'new_message',
			content: message.content,
			user: message.userId
		});
	}

	addCallbacks(messagesCallback, newMessageCallback) {
		this.callbacks.messages = messagesCallback;
		this.callbacks.new_message = newMessageCallback;
	}

	sendMessage(data) {
		try {
			this.socketRef.send(JSON.stringify({ ...data }));
		} catch (err) {
			console.log(err.message);
		}
	}

	state() {
		return this.socketRef.readyState;
	}
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
