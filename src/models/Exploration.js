export default class Exploration {
	constructor(location, conversations, actions, limit) {
		this.id = explorationId++;
		this.location = location;
		this.conversations = conversations || [];
		this.actions = actions || [];
		this.limit = limit || 0;
	}

	addConversation(conversation) {
		this.conversations.push(conversation);
	}

	addAction(action) {
		this.actions.push(action);
	}

	removeConversation(index) {
		this.conversations.splice(index, 1);
	}

	removeAction(index) {
		this.actions.splice(index, 1);
	}
}

let explorationId = 0;