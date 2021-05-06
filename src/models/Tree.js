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
		let currentNode = this.trunk;
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

	goNext() {
		let nextIndex = this.cursor[this.cursor.length-1]++;
		if (nextIndex === this.getNextIndex()) {
			this.goUp();
			this.goNext();
			return true;
		}
		return false;
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