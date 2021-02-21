<template>
	<div class="grid">
		<div class="tree">
			<NavRecap :tree="tree"></NavRecap>

			<NavBranches 
				:node="tree.trunk" 
				:depth="0"
				:nodeSelected="currentNode"
				@onNodeSelection="cursorUpdate($event)"></NavBranches>
		</div>

		<NodeDialogs class="dialogs" :node="currentNode"></NodeDialogs>
	</div>
</template>

<script>
import NavData from '../mixins/NavData.js'

import NavRecap from './NavRecap.vue'
import NavBranches from './NavBranches.vue'
import NodeDialogs from './NodeDialogs.vue'

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
			currentNode: null,
		}
	},
	created() {
		this.currentNode = this.tree.trunk;
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
			this.tree().cursor = indexes;
			this.currentNode = this.tree.getCurrentNode();
		}
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
