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
			case OPERATOR.INFERIOR_OR_EQUAL:
				return val <= this.value;
			case OPERATOR.EQUAL:
				return val === this.value;
			case OPERATOR.SUPERIOR:
				return val > this.value;
			case OPERATOR.SUPERIOR_OR_EQUAL:
				return val >= this.value;
		}
	}
}

let conditionId = 0;

const OPERATOR = {
	INFERIOR: "lower than",
	INFERIOR_OR_EQUAL: "lower than or equal to",
	EQUAL: "equal to",
	SUPERIOR_OR_EQUAL: "higher than or equal to",
	SUPERIOR: "higher than"
};

export { Condition, OPERATOR };