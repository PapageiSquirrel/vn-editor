export default class Dialog {
	constructor(character, mood, text) {
		this.id = did++;
		this.character = character;
		this.mood = mood;
		this.text = text;
	}
}

let did = 0;