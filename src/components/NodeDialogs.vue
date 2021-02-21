<template>
	<div>
		<h4>{{node.title}}</h4>
		<div v-for="(dialog, index) in node.dialogs" :key="dialog.did">
			<DialogEdit :dialogIndex="index" @addDialog="onAddDialog"></DialogEdit>
			<p>{{index}}<b>{{dialog.character + " (" + dialog.mood + ") :"}}</b> {{dialog.text}}</p>
		</div>
		<DialogEdit :dialogIndex="node.dialogs.length" @addDialog="onAddDialog"></DialogEdit>

		<div>
			<NodeDialogs v-for="(childNode, nodeIndex) in node.children" 
				:key="nodeIndex"
				:node="childNode"></NodeDialogs>
		</div>
	</div>
</template>

<script>
import TreeNode from '../models/TreeNode'

import DialogEdit from './DialogEdit';

export default {
	name: 'NodeDialogs',
	components: {
		DialogEdit
	},
	props: {
		node: TreeNode
	},
	methods: {
		onAddDialog(event) {
			this.node.addDialog(event.index, event.dialog.character, event.dialog.mood, event.dialog.text);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
p {
	margin: 2px;
}

p:hover {
	background-color: lightgray;
}
</style>