<template>
	<div>
		<h4 :class="{ decisiveChoice: node.isDecisive }" style="text-indent: 15%; letter-spacing: 2px; margin-bottom: 5px;"><font-awesome-icon v-if="node.isDecisive" icon="exclamation-circle" /> {{node.title}}</h4>
		<div v-for="(interaction, index) in simpleInteractions" :key="interaction.value.id">
			<InteractionEdit :interactionIndex="index" 
				@newInteraction="onNewInteraction"
				@addDialog="onAddDialog" 
				@addChoice="onAddChoice"></InteractionEdit>
			
			<DialogEdit v-if="interaction.type === 'dialog'" v-show="isEditedElement(index)" :defaultCharacter="interaction.value.character" 
				:defaultMood="interaction.value.mood" :defaultText="interaction.value.text" @addDialog="onEditDialog($event, index)"></DialogEdit>

			<div v-if="interaction.type === 'choice'">
				<p><b>Choice:</b></p>
				<p v-for="option in interaction.value.options" :key="option.title" style="text-align:left;">
					{{ option.title + " (" + (Math.sign(option.traitValue) !== -1 ? "+" : "") + option.traitValue + " " + option.traitChange + ")" }}
				</p>
			</div>

			<div v-if="interaction.type === 'dialog'" v-show="!isEditedElement(index)" style="display: flex;">
				<ReorderingButtons style="width: 10%" :index="index" :length="simpleInteractions.length" @reorder="onReorder($event, index)"></ReorderingButtons>
				<p style="width: 90%;"><b>{{interaction.value.character + (interaction.value.mood ? " (" + interaction.value.mood + ")" : "") + ": "}}</b>{{interaction.value.text}}</p>
				<button class="button button-icon button-green" @click="editOrUpdate(index)">
					<font-awesome-icon icon="edit" />
				</button>
				<button class="button button-icon button-red" @click="node.removeDialog(index)">
					<font-awesome-icon icon="times" />
				</button>
			</div>
		</div>

		<InteractionEdit v-if="!node.isDecisive"
			:interactionIndex="simpleInteractions.length"
			@newInteraction="onNewInteraction"
			@addDialog="onAddDialog"
			@addChoice="onAddChoice"></InteractionEdit>

		<div>
			<NodeDialogs v-for="childNode in node.children"
				:key="childNode.id"
				:node="childNode"></NodeDialogs>
		</div>
	</div>
</template>

<script>
import { cacheService, CACHE_TYPE, CACHE_KEY } from '../../services/CacheService.js'

import InteractionEdit from './InteractionEdit.vue'
import DialogEdit from './DialogEdit.vue'
import ReorderingButtons from '../generic/ReorderingButtons.vue'

export default {
	name: 'NodeDialogs',
	components: {
		InteractionEdit,
		DialogEdit,
		ReorderingButtons
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
		simpleInteractions() {
			return this.node.interactions.filter(i => !this.isDecisiveChoice(i));
		}
	},
	methods: {
		editOrUpdate(index) {
			cacheService.addToCache(CACHE_TYPE.APP, CACHE_KEY.INTERACTION_EDIT, true);
			this.editIndex = index;
		},
		isEditedElement(index) {
			return this.editIndex === index;
		},
		onNewInteraction(event) {
			cacheService.addToCache(CACHE_TYPE.APP, CACHE_KEY.INTERACTION_EDIT, true);
			this.editIndex = event;
		},
		onAddDialog(event) {
			this.node.addDialog(event.index, event.dialog.character, event.dialog.mood, event.dialog.text);
			this.editIndex = -1;
			cacheService.addToCache(CACHE_TYPE.APP, CACHE_KEY.INTERACTION_EDIT, false);
		},
		onAddChoice(event) {
			let sectionIndex = -1;
			if (event.choice.isDecisive) {
				sectionIndex = this.node.interactions.filter(i => this.isDecisiveChoice(i)).length;
				this.node.addChildAtIndex(sectionIndex, event.choice.options.map(o => o.title + " (" + (Math.sign(o.traitValue) !== -1 ? "+" : "") + o.traitValue + " " + o.traitChange + ")"));
			}
			this.node.addChoice(event.index, event.choice.options, sectionIndex, event.choice.isDecisive);
			
			this.editIndex = -1;
			cacheService.addToCache(CACHE_TYPE.APP, CACHE_KEY.INTERACTION_EDIT, false);
		},
		onEditDialog(event, index) {
			this.node.editDialog(index, event.dialog.character, event.dialog.mood, event.dialog.text);
			this.editIndex = -1;
			cacheService.addToCache(CACHE_TYPE.APP, CACHE_KEY.INTERACTION_EDIT, false);
		},
		onReorder(newIndex, oldIndex) {
			this.node.interactions.splice(newIndex, 0, this.node.interactions.splice(oldIndex, 1)[0]);
		},
		isDecisiveChoice(interaction) {
			return interaction.type === "choice" && interaction.value.isDecisive;
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

.decisiveChoice {
	color: #4f000f
}
</style>