<template>
	<div class="bordered paddingLg" :style="{ backgroundColor: backgroundColor }">
		<div style="display: flex">
			<ReorderingButtons style="width: 20%" v-show="branchLength > 1" :index="nodeIndex" :length="branchLength"
				@reorder="onReorder"></ReorderingButtons>

			<NodeHead class="noPadding" style="width: 70%; margin-left: 5%; margin-right: 5%;"
				:backgroundColor="backgroundColor" 
				:node="node" 
				:isSelected="isNodeSelected"
				@onNodeSelection="selectNode"
				@onNodeEdition="editNode"
				@onNodeDeletion="deleteNode"></NodeHead>
		</div>

		<NodeDetail v-bind:node="node" v-bind:isShort="!isOpen"></NodeDetail>

		<div v-show="!isOpen">
			<button class="button button-white" @click="toggleSubNodes()">
				<span v-show="node.hasChildren()">open</span>
				<span v-show="!node.hasChildren()">create sub-section</span>
			</button>
		</div>

		<div v-show="isOpen">
			<button class="button button-white" @click="untoggleSubNodes()">Close sub-sections</button>

			<div>          
				<NavBranches v-for="(childNode, nodeIndex) in node.children" :key="nodeIndex"
						:nodeIndex="nodeIndex"
						:node="childNode"
						:branchLength="node.children.length"
						:depth="nextDepth"
						:nodeSelected="nodeSelected"
						@onNodeSelection="selectNode($event)"
						@onReorder="reorderChildren($event)"
						style="margin-bottom: 20px;"></NavBranches>
				<button class="button button-white" @click="node.addChild()">add</button>
			</div>
		</div>

		<NodeFoot :node="node"></NodeFoot>
	</div>
</template>

<script>
import NodeHead from './NodeHead.vue'
import NodeDetail from './NodeDetail.vue'
import NodeFoot from './NodeFoot.vue'

import ReorderingButtons from '../generic/ReorderingButtons.vue'

export default {
	name: 'NavBranches',
	components: {
		NodeHead,
		NodeDetail,
		NodeFoot,
		ReorderingButtons
	},
	props: {
		nodeIndex: Number,
		node: Object,
		branchLength: Number,
		nodeSelected: Object,
		displayChildren: Boolean,
		depth: Number
	},
	data: function() {
		return {
			isOpen: false,
			leftStepMargin: 50,
			colorRatio: 32
		}
	},
	computed: {
		nextDepth: function() {
			return this.depth+1;
		},
		backgroundColor: function() {
			let color = (256- this.depth * this.colorRatio).toString();
			return 'rgb(' + color + ',' + color + ',' + color + ')';
		},
		isNodeSelected: function() {
			return this.nodeSelected && this.node.id === this.nodeSelected.id;
		}
	},
	methods: {
		toggleSubNodes: function() {
			this.isOpen = true;
		},
		untoggleSubNodes: function() {
			this.isOpen = false;
		},
		selectNode: function(indexes) {
			indexes.splice(0, 0, this.node.index);
			this.$emit("onNodeSelection", indexes);
		},
		editNode() {

		},
		deleteNode() {

		},
		reorderChildren(event) {
			this.node.children.splice(event.next, 0, this.node.children.splice(event.previous, 1)[0]);
		},
		onReorder(index) {
			this.$emit("onReorder", {previous: this.nodeIndex, next: index});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.bordered {
	border-style: solid none solid dashed;
	border-width: 4px;
	border-color: black;
	border-radius: 20px;
}

.paddingLg {
	padding: 20px;
}
.noPadding {
	margin: -20px -20px 0px -20px;
}
</style>
