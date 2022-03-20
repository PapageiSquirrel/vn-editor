import Dialog from './Dialog.js'
import { Choice } from './Choice.js'
import { Condition } from './Condition.js'
import Trigger from './Trigger.js'

export default class TreeNode {
	constructor(index, title, description, interactions, isDecisive) {
		this.id = nodeId++;
		this.index = index;
		this.children = [];
		Object.assign(this, genericAttributesMixin, interactionMixin, triggerMixin);

		this.initGenericData(title, description);
		this.initInteractionData(interactions, isDecisive);
	}

	addChild() {
		this.children.push(new TreeNode(this.children.length));
	}

	addChildAtIndex(index, options) {
		this.children.forEach(c => {
			if (c.index >= index) {
				c.index++;
			}
		});
		let node = new TreeNode(index);
		node.setAttribute("title", "Choice");
		node.setAsChoice();
		options.forEach((o,i) => {
			let childNode = new TreeNode(i);
			childNode.setAsOption(o);
			childNode.setAttribute("title", o.title);
			node.children.push(childNode);
		});
		this.children.splice(index, 0, node);
	}

	removeChild(index) {
		this.children.splice(index, 1);
	}

	getChild(index) {
		return this.children.find(c => c.index === index);
	}

	getNumberOfChildren() {
		return this.children.length;
	}

	hasChildren() {
		return !!this.children.length;
	}
}

let nodeId = 0;

let genericAttributesMixin = {
	title: "Title",
	description: "Description",

	initGenericData(title, description) {
		if (title) {
			this.title = title;
		}
		if (description) {
			this.description = description;
		}
	},

	setAttribute(key, value) {
		this[key] = value;
	},

	setAttributes(object) {
		for (let [key, value] of Object.entries(object)) {
			this.setAttribute(key, value);
		}
	}
};

const INTERACTION_TYPE = {
	DIALOG: "dialog",
	CHOICE: "choice"
};

let interactionMixin = {
	interactions: [],
	conditions: [],
	isChoice: false,
	isDecisive: false,
	isOption: false,
	traitValue: null,
	traitChange: null,

	initInteractionData(interactions, isDecisive) {
		if (interactions) {
			this.interactions = interactions.map(i => {
				let interaction = {
					type: i.type
				};
				if (i.type === "choice") {
					interaction.value = new Choice(i.value.options, i.value.index, i.value.isDecisive);
				} else {
					interaction.value = new Dialog(i.value.character, i.value.mood, i.value.text);
				}
				return interaction;
			});
		} else {
			this.interactions = this.interactions.slice();
		}
		
		if (isDecisive != null) {
			this.isDecisive = isDecisive;
		}
	},

	addDialog(index, character, mood, text) {
		this.interactions.splice(index, 0, {type: INTERACTION_TYPE.DIALOG, value: new Dialog(character, mood, text)});
	},

	editDialog(index, character, mood, text) {
		let dialog = this.interactions[index];
		dialog.value.character = character;
		dialog.value.mood = mood;
		dialog.value.text = text;
	},

	removeDialog(index) {
		this.interactions.splice(index, 1);
	},

	addChoice(index, options, sectionIndex, isDecisive) {           
		this.interactions.splice(index, 0, {type: INTERACTION_TYPE.CHOICE, value: new Choice(options, sectionIndex, isDecisive)});
	},

	addCondition(trait, operator, value) {
		this.conditions.push(new Condition(trait, operator, value));
	},

	setAsChoice() {
		this.isChoice = true;
		this.isDecisive = true;
	},

	setAsOption(option) {
		this.isOption = true;
		this.traitValue = option.traitValue;
		this.traitChange = option.traitChange;
	}
};

let triggerMixin = {
	triggers: [],

	initTriggerData(triggers) {
		triggers.map(t => new Trigger(name));
	},

	addTrigger(name) {
		this.triggers.push(new Trigger(name));
	},

	removeTrigger(index) {
		this.triggers.splice(index, 1);
	}
}