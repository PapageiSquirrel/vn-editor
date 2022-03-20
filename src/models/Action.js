import Tree from './Tree.js'

export default class Action extends Tree {
	constructor(condition, isRepetable) {
		super(actionId++, null, "New Action");
		this.condition = condition;
		this.isRepetable = isRepetable;
	}
}

let actionId = 100000;