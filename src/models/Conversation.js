import Tree from './Tree.js'

export default class Conversation extends Tree {
	constructor(characters, condition) {
		super(conversationId++, null, "New Conversation");
		this.characters = characters || [];
		this.condition = condition;
	}
}

let conversationId = 1000;