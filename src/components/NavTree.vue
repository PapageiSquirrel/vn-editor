<template>
	<div class="grid">
		<div class="tree">
			<NavRecap :tree="tree" @save="save"></NavRecap>

			<NavBranches 
				:nodeIndex="0"
				:node="tree.trunk"
				:branchLength="1" 
				:depth="0"
				:nodeSelected="currentNode"
				@onNodeSelection="cursorUpdate($event)"></NavBranches>
		</div>

		<NodeDialogs class="dialogs" :node="currentNode"></NodeDialogs>
	</div>
</template>

<script>
import NavData from '../mixins/NavData.js'

import NavRecap from './tree/NavRecap.vue'
import NavBranches from './tree/NavBranches.vue'
import NodeDialogs from './tree/NodeDialogs.vue'

export default {
	name: 'NavTree',
	mixins: [
		NavData
	],
	components: {
		NavRecap,
		NavBranches,
		NodeDialogs
	},
	data() {
		return {
			collection: "trees",
			currentNode: null,
		}
	},
	computed: {
		tree() {
			if (!this.loadedData) {
				this.add();
			}
			return this.loadedData;
		}
	},
	methods: {
		cursorUpdate(indexes) {
			// remove trunk from indexes
			indexes.splice(0, 1);
			this.tree.cursor = indexes;
			this.currentNode = this.tree.getCurrentNode();
		}
	},
	created() {
		this.currentNode = this.tree.trunk;
	},
	destroyed() {
		//this.save();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.grid {
	display: flex;
}

.tree {
	width: 40%;
	text-align: left;
}

.dialogs {
	width: 60%;
	border: solid 1px black;
	margin: 20px;
}
</style>
