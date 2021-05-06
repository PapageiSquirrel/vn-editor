let traitId = 0;

export default class Trait {
	constructor(name, steps) {
		this.id = traitId++;
		this.name = name;
		this.steps = steps && steps.map(s => new Step(s.name, s.value)) || [];
	}

	addStep(name, value) {
		this.steps.push(new Step(name, value));
	}
}

class Step {
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}
}