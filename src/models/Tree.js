import TreeNode from './TreeNode.js'

export default class Tree {
	constructor(trunk, name) {
		this.trunk = this.__buildNodes(0, trunk);
		this.name = name || "Tree Name";
		this.cursor = [];
	}

	__buildNodes(index, node) {
		let newNode = Object.assign(new TreeNode(index), node);
		if (newNode.hasChildren()) {
			newNode.children = newNode.children.map((child, index) => {
				return this.__buildNodes(index, child);
			});
		}
		return newNode;
	}

	getCurrentNode() {
		var currentNode = this.trunk;
		this.cursor.forEach(index => currentNode = currentNode.getChild(index));
		return currentNode;
	}

	getNextIndex() {
		return this.getCurrentNode().getNumberOfChildren();
	}

	goDown(index) {
		this.cursor.push(index);
	}

	goUp() {
		this.cursor.pop();
	}

	getDepth() {
		return this.cursor.length;
	}

	getRecap() {
		var currentNode = this.trunk;
		return this.cursor.reduce((recap, index) => {
			currentNode = currentNode.getChild(index);
			recap.push(currentNode.title);
			return recap;
		}, [this.trunk.title]);
	}
}

/*
class TreeLink {
	constructor(before, after) {
		this.before = before;
		this.conditions = [];
		this.after = after;
	}

	addCondition(condition) {
		this.conditions.push(condition);
	}

	deleteCondition(index) {
		this.conditions.splice(index, 1);
	}

	getCondition(index) {
		return this.conditions[index];
	}
}

class LinkCondition {
	constructor(key, value, operator, parent) {
		this.key = key;
		this.value = value;
		this.operator = operator;
		this.parent = parent || undefined;
	}

	getResult(currentValue) {
		switch(this.operator) {
			case "<":
				return currentValue < this.value;
			case "<=":
				return currentValue <= this.value;
			case "===":
				return currentValue === this.value;
			case ">=":
				return currentValue >= this.value;
			case ">":
				return currentValue > this.value;
		}
	}
}
*/