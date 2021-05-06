export default class Dialog {
	constructor(character, mood, text) {
		this.id = dialogId++;
		this.character = character;
		this.mood = mood;
		this.text = text;
	}

	toString() {
		return this.character + "(" + this.mood + "): " + this.text + "";
	}
}

let dialogId = 0;