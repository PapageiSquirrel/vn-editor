import Dialog from '../models/TreeNode.js';
import { Choice, Option } from '../models/Choice.js';
import { Condition } from '../models/Condition.js';
import Exploration from '../models/Exploration.js';

class InteractionService {
	constructor() {
		this.adapters = {
			dialogs: dialogAdapter,
			choices: choiceAdapter,
			options: optionAdapter,
			conditions: conditionAdapter,
			explorations: explorationAdapter
		}
	}
}

const INTERACTION_TYPE = {
	DIALOG: "dialogs",
	CHOICE: "choices",
	OPTION: "options",
	CONDITION: "condition",
	EXPLORATION: "exploration"
}

const dialogAdapter = {
	create(obj) {
		return new Dialog(obj.character, obj.mood, obj.text);
	}
};

const choiceAdapter = {
	create(arr) {
		return new Choice(arr);
	}
};

const optionAdapter = {
	create(obj) {
		return new Option(obj.title, obj.traitChange, obj.traitValue);
	}
};

const conditionAdapter = {
	create(obj) {
		return new Condition(obj.trait, obj.operator, obj.value);
	}
};

const explorationAdapter = {
	create(obj) {
		return new Exploration(obj.location, obj.conversations, obj.actions, obj.limit)
	}
}

const interactionService = new InteractionService();
export { interactionService, INTERACTION_TYPE };