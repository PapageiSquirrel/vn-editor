class Condition {
	constructor(trait, operator, value) {
		this.id = conditionId++;
		this.trait = trait;
		this.operator = operator;
		this.value = value;
	}

	isVerified(val) {
		switch(this.operator) {
			case OPERATOR.INFERIOR:
				return val < this.value;
			case OPERATOR.EQUAL:
				return val === this.value;
			case OPERATOR.SUPERIOR:
				return val > this.value;
		}
	}
}

let conditionId = 0;

const OPERATOR = {
	INFERIOR: "<",
	EQUAL: "=",
	SUPERIOR: ">"
};

export { Condition, OPERATOR };