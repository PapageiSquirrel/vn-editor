let historyId = 0;

export default class History {
	constructor(id, name, description) {
		this.id = id || historyId + "";
		this.name = name;
		this.description = description;
		historyId++;
	}
}