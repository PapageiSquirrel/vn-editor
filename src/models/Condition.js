class Condition {
	constructor(trait, step) {
		this.id = conditionId++;
		this.trait = trait;
		this.step = step
	}
}

let conditionId = 0;

export { Condition };