import Dialog from './Dialog';

export default class TreeNode {
	constructor(index) {
		this.id = nodeId++;
		this.index = index;
		this.children = [];
		Object.assign(this, genericAttributesMixin, dialogMixin);
	}

	addChild() {
		this.children.push(new TreeNode(this.children.length));
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

	setAttribute(key, value) {
		this[key] = value;
	},

	setAttributes(object) {
		for (let [key, value] of Object.entries(object)) {
			this.setAttribute(key, value);
		}
	}
}

let dialogMixin = {
	dialogs: [],

	addDialog(index, character, mood, text) {
		this.dialogs.splice(index, 0, new Dialog(character, mood, text));
	},

	editDialog(index, attr, value) {
		this.dialogs[index][attr] = value;
	},

	removeDialog(index) {
		this.dialogs.splice(index, 1);
	}
}