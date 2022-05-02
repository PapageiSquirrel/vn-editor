import TreeNode from './TreeNode.js'

let tid = 0;

export default class Tree {
	constructor(id, trunk, name) {
		tid++;
		this.id = id || tid;
		this.trunk = this.__buildNodes(0, trunk);
		this.name = name || "Tree Name";
		this.cursor = [];
	}

	__buildNodes(index, node) {
		let newNode = !node ? new TreeNode(index) : new TreeNode(index, node.title, node.description, node.interactions, node.isDecisive, node.conditions, node.triggers);
		if (node && node.children.length) {
			newNode.children = node.children.map((child, index) => {
				return this.__buildNodes(index, child);
			});
		}
		return newNode;
	}

	goTo(array) {
		this.cursor.push(...array);
	}

	getCurrentNode() {
		let currentNode = this.trunk;
		this.cursor.forEach(index => currentNode = currentNode.getChild(index));
		return currentNode;
	}

	getNextIndex() {
		let node = this.getCurrentNode();
		return node && node.getNumberOfChildren();
	}

	goDown(index) {
		this.cursor.push(index);
	}

	goUp() {
		this.cursor.pop();
	}

	goNext() {
		let node = this.getCurrentNode();
		if (!node) {
			this.goUp();
			this.cursor.splice(this.cursor.length-1, 1, this.cursor[this.cursor.length-1]+1);
		} else if (node.hasChildren()) {
			this.goDown(0);
		} else {
			this.cursor.splice(this.cursor.length-1, 1, this.cursor[this.cursor.length-1]+1);
		}

		let newNode = this.getCurrentNode();
		if (!newNode && this.cursor.length > 1 || newNode && !newNode.interactions.length) {
			this.goNext();
		}
	}

	getDepth() {
		return this.cursor.length;
	}

	getRecap() {
		let currentNode = this.trunk;
		return this.cursor.reduce((recap, index) => {
			currentNode = currentNode.getChild(index);
			recap.push(currentNode.title);
			return recap;
		}, [this.trunk.title]);
	}
}