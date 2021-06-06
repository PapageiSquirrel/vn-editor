import Dialog from '../models/TreeNode.js';
import { Choice, Option } from '../models/Choice.js';
import { Condition } from '../models/Condition.js';

class InteractionService {
	constructor() {
		this.adapters = {
			dialogs: dialogAdapter,
			choices: choiceAdapter,
			options: optionAdapter,
			conditions: conditionAdapter
		}
	}
}

const INTERACTION_TYPE = {
	DIALOG: "dialogs",
	CHOICE: "choices",
	OPTION: "options",
	CONDITION: "condition"
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

const interactionService = new InteractionService();
export { interactionService, INTERACTION_TYPE };