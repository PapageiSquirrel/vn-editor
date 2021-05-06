let choiceId = 0;

class Choice {
	constructor(options) {
		this.id = choiceId++;
		this.options = options;
		this.chosenOptionIndex = -1;
	}

	getNbOptions() {
		return this.options.length;
	}
}

class Option {
	constructor(title, traitChange, traitValue, triggerName) {
		this.title = title;
		this.traitChange = traitChange;
		this.traitValue = traitValue;
		this.triggerValue = triggerName;
	}

	toString() {
		return this.title + "(" + this.traitChange + " " + this.valueChange + ")";
	}
}

export { Choice, Option };