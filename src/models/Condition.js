class Condition {
	constructor(trait, value) {
		this.id = conditionId++;
		this.trait = trait;
		this.value = value
	}
}

let conditionId = 0;

export { Condition };