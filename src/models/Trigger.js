let triggerId = 0;

export default class Trigger {
	constructor(name) {
		this.id = triggerId++;
		this.name = name;
	}
}