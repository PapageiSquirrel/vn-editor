<template>
	<v-container class="grid">
		<div class="tree" v-show="showTree" :style="{ width: nodeWidth(showTree) }">
			<NavRecap :tree="tree" @save="save"></NavRecap>

			<NavBranches 
				:nodeIndex="0"
				:node="tree.trunk"
				:branchLength="1" 
				:depth="0"
				:nodeSelected="currentNode"
				@onNodeSelection="cursorUpdate($event)"></NavBranches>
		</div>

		<NodeDialogs v-show="showDialogs" class="dialogs" :node="currentNode" :style="{ width: nodeWidth(showDialogs) }"></NodeDialogs>

		<NodeTriggers v-show="showTriggers" class="triggers" :style="{ width: nodeWidth(showTriggers) }"></NodeTriggers>
	</v-container>
</template>

<script>
import NavData from '../mixins/NavData'

import NavRecap from './tree/NavRecap'
import NavBranches from './tree/NavBranches'
import NodeDialogs from './tree/NodeDialogs'
import NodeTriggers from './tree/NodeTriggers'

export default {
	name: 'NavTree',
	mixins: [
		NavData
	],
	components: {
		NavRecap,
		NavBranches,
		NodeDialogs,
		NodeTriggers
	},
	props: {
		showTree: Boolean,
		showDialogs: Boolean,
		showTriggers: Boolean,
		showExplorations: Boolean
	},
	data() {
		return {
			collection: "trees",
			keepCache: false,
			clearCache: false
		}
	},
	computed: {
		tree() {
			if (!this.loadedData) {
				this.add();
			}
			return this.loadedData;
		},
		currentNode() {
			return this.tree && this.tree.getCurrentNode();
		},
		numberOfComponents() {
			return Number(this.showTree) + Number(this.showDialogs) + Number(this.showTriggers) + Number(this.showExplorations);
		}
	},
	methods: {
		cursorUpdate(indexes) {
			// remove trunk from indexes
			indexes.splice(0, 1);
			this.tree.cursor = indexes;
		},
		nodeWidth(isShown) {
			return isShown && this.numberOfComponents === 1 ? "100%" : "50%";
		}
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
	text-align: left;
}

.dialogs {
	border: solid 1px black;
	margin: 20px;
}
</style>
