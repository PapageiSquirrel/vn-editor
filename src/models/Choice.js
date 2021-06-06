let choiceId = 10000;
let optionId = 0;

class Choice {
	constructor(options, index, isDecisive) {
		this.id = choiceId++;
		this.options = options && options.map(o => new Option(o.title, o.traitChange, o.traitValue)) || [];
		this.index = index;
		this.chosenOptionIndex = -1;
		this.isDecisive = isDecisive;
	}

	getNbOptions() {
		return this.options.length;
	}
}

class Option {
	constructor(title, traitChange, traitValue) {
		this.id = optionId++;
		this.title = title;
		this.traitChange = traitChange;
		this.traitValue = traitValue;
	}

	toString() {
		return this.title + "(" + this.traitChange + " " + this.valueChange + ")";
	}
}

export { Choice, Option };