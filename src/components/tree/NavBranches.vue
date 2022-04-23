<template>
	<div class="bordered paddingLg" :style="{ backgroundColor: backgroundColor }">
		<div style="display: flex">
			<ReorderingButtons style="width: 20%" v-show="branchLength > 1" :index="nodeIndex" :length="branchLength"
				@reorder="onReorder"></ReorderingButtons>

			<NodeHead class="noPadding" style="width: 100%; margin-left: 5%; margin-right: 5%;"
				:backgroundColor="backgroundColor" 
				:node="node" 
				:traits="traits"
				:isSelected="isNodeSelected"
				@onNodeSelection="selectNode"
				@onNodeEdition="editNode"
				@onNodeDeletion="deleteNode"></NodeHead>
		</div>

		<ListSelectInput :elements="node.conditions" :elType="'condition'" :elKey="'trait'" :elLabel="'New Condition'" :elList="traits.map(t => t.name)" :isUnique="true">
			<template v-slot:default="slotProps">
				<v-card-text>
					<v-slider 
						v-model="stepIndex[slotProps.element.trait]"
						:tick-labels="getSteps(slotProps.element.trait)" 
						@change="setStepValue(slotProps.element, stepIndex[slotProps.element.trait])" 
						ticks="always" 
						step="1" 
						tick-size="2" 
						:max="getSteps(slotProps.element.trait).length-1"
						style="width:80%; margin-left: 5%; margin-right: 5%;">
					</v-slider>
				</v-card-text>
			</template>
		</ListSelectInput>

		<v-textarea v-model="node.description" rows="1"></v-textarea>

		<div v-show="!isOpen">
			<v-btn class="button button-primary" @click="toggleSubNodes()">
				<span v-show="node.hasChildren()">open sub-sections ({{node.getNumberOfChildren()}})</span>
				<span v-show="!node.hasChildren()">create sub-section</span>
			</v-btn>
		</div>

		<div v-show="isOpen">
			<v-btn class="button button-primary" @click="untoggleSubNodes()">Close sub-sections ({{node.getNumberOfChildren()}})</v-btn>

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
						
				<v-btn class="button button-primary" @click="node.addChild()">add sub-section</v-btn>
			</div>
		</div>

		<ListSelectInput :elements="node.triggers" :elType="'trigger'" :elKey="'name'" :elLabel="'New Trigger'" :elList="triggersPlusAnother" :isUnique="true" style="margin-top: 5%;">
			<template v-slot:default="slotProps">
				<v-text-field type="text" v-if="slotProps.element.name === 'New Trigger'" v-model="newTrigger" style="margin-left: 5%; margin-right: 5%;" />
				<v-btn v-if="slotProps.element.name === 'New Trigger'" fab color="primary" @click="saveTrigger">
					<font-awesome-icon icon="save" />
				</v-btn>
			</template>
		</ListSelectInput>

		<NodeFoot v-if="false" :node="node"></NodeFoot>
	</div>
</template>

<script>
import { cacheService, CACHE_TYPE, CACHE_KEY } from '../../services/CacheService'

import NodeHead from './NodeHead'
import NodeFoot from './NodeFoot'

import ReorderingButtons from '../generic/ReorderingButtons'
import ListSelectInput from '../generic/ListSelectInput'

export default {
	name: 'NavBranches',
	components: {
		NodeHead,
		NodeFoot,
		ReorderingButtons,
		ListSelectInput
	},
	props: {
		nodeIndex: Number,
		node: Object,
		branchLength: Number,
		nodeSelected: Object,
		displayChildren: Boolean,
		depth: Number
	},
	data() {
		return {
			isOpen: false,
			leftStepMargin: 50,
			colorRatio: 32,
			newTrigger: "",
			stepIndex: {},
			traits: [],
			triggers: []
		}
	},
	computed: {
		nextDepth() {
			return this.depth+1;
		},
		backgroundColor() {
			if (this.node.isDecisive) {
				return 'rgb(200, 60, 80)';
			}

			// TODO: adapt depending on the theme selected
			let color = (this.depth * this.colorRatio).toString();
			return 'rgb(' + color + ',' + color + ',' + color + ')';
		},
		triggersPlusAnother() {
			return [...this.triggers, "New Trigger"];
		},
		isNodeSelected() {
			return this.nodeSelected && this.node.id === this.nodeSelected.id;
		}
	},
	methods: {
		getSteps(traitSelected) {
			let trait = this.traits.find(t => t.name === traitSelected);
			if (!trait) {
				return [];
			}

			return trait.steps.map(s => s.name).reverse();
		},
		setStepValue(condition, stepIndex) {
			if (!condition) {
				return;
			}

			let trait = this.traits.find(t => t.name === condition.trait);
			if (!trait) {
				return;
			}

			let step = trait.steps.slice().reverse()[stepIndex];
			if (!step) {
				return;
			}

			condition.value = step.value;
		},
		toggleSubNodes() {
			this.isOpen = true;
		},
		untoggleSubNodes() {
			this.isOpen = false;
		},
		selectNode(indexes) {
			indexes.splice(0, 0, this.node.index);
			this.$emit("onNodeSelection", indexes);
		},
		editNode() {

		},
		deleteNode() {

		},
		saveTrigger() {
			// TODO : add a new trigger to the collection
			this.newTrigger = "";
		},
		reorderChildren(event) {
			this.node.children.splice(event.next, 0, this.node.children.splice(event.previous, 1)[0]);
		},
		onReorder(index) {
			this.$emit("onReorder", {previous: this.nodeIndex, next: index});
		}
	},
	created() {
		let storyTraits = cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.STORY_TRAITS);
		this.traits = storyTraits || [];

		let storyTriggers = cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.STORY_TRIGGERS);
		this.triggers = (storyTriggers || []).map(t => t.name);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.bordered {
	border-style: solid;
	border-width: 2px;
	border-color: black;
	border-radius: 10px;
}

.paddingLg {
	padding: 20px;
}
.noPadding {
	margin: -20px -20px 0px -20px;
}
</style>
