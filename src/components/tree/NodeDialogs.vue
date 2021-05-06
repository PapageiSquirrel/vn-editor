<template>
	<div>
		<h4>{{node.title}}</h4>
		<div v-for="(dialog, index) in node.dialogs" :key="dialog.did">
			<InteractionEdit v-show="isShown(index)" :interactionIndex="index" 
				@newInteraction="onNewInteraction"
				@addDialog="onAddDialog" 
				@addChoice="onAddChoice"></InteractionEdit>
			<p><b>{{dialog.character + " (" + dialog.mood + "): "}}</b>{{dialog.text}}</p>
		</div>

		<InteractionEdit v-show="isShown(node.dialogs.length)" :interactionIndex="node.dialogs.length"
			@newInteraction="onNewInteraction"
			@addDialog="onAddDialog"
			@addChoice="onAddChoice"></InteractionEdit>

		<div>
			<p v-for="option in choiceOptions" :key="option.title">{{ option.title + "(" + option.traitChange + " " + option.valueChange + ")" }}</p>
		</div>

		<div>
			<NodeDialogs v-for="(childNode, nodeIndex) in node.children"
				:key="nodeIndex"
				:node="childNode"></NodeDialogs>
		</div>
	</div>
</template>

<script>
import { cacheService, CACHE_TYPE, CACHE_KEY } from '../../services/CacheService.js'

import InteractionEdit from './InteractionEdit.vue';

export default {
	name: 'NodeDialogs',
	components: {
		InteractionEdit
	},
	props: {
		node: Object
	},
	data() {
		return {
			editIndex: -1
		}
	},
	computed: {
		choiceOptions() {
			return this.node.choice && this.node.choice.options || [];
		}
	},
	methods: {
		isEditing() {
			return cacheService.getCache(CACHE_TYPE.APP, CACHE_KEY.INTERACTION_EDIT);
		},
		isShown(index) {
			return !this.isEditing() || this.editIndex === index;
		},
		onNewInteraction(event) {
			this.editIndex = event;
			cacheService.addToCache(CACHE_TYPE.APP, CACHE_KEY.INTERACTION_EDIT, true);
		},
		onAddDialog(event) {
			this.node.addDialog(event.index, event.dialog.character, event.dialog.mood, event.dialog.text);
			this.editIndex = -1;
			cacheService.addToCache(CACHE_TYPE.APP, CACHE_KEY.INTERACTION_EDIT, false);
		},
		onAddChoice(event) {
			this.node.addChoice(event);
			this.editIndex = -1;
			cacheService.addToCache(CACHE_TYPE.APP, CACHE_KEY.INTERACTION_EDIT, false);
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