<template>
	<div>
		<div v-show="!editMode">
			<ul>
				<li v-for="option in options" :key="option.id">{{ option.title + "(" + option.traitChange + " " + option.valueChange + ")" }}</li>
			</ul>

			<button @click="addChoice">{{ options.length > 0 ? "Edit choice" : "Add a choice" }}</button>
		</div>

		<div v-show="editMode">
			<div v-show="options.length > 0" v-for="option in options" :key="option.id" class="optionContainer">
				<v-text-field type="text" v-model="option.title" placeholder="Option label" />
				<v-select v-model="option.traitChange" :items="traits.map(t => t.name)" style="margin-left: 5%; margin-right: 5%;" placeholder="Trait to change" />
				<v-text-field type="number" v-model="option.traitValue" hide-details single-line style="margin-left: 5%; margin-right: 5%;" />
			</div>
			
			<div style="display: block-inline">
				<input name="decisiveInput" type="checkbox" v-model="isDecisive" style="width: auto" />
				<label for="decisiveInput" style="width: 80%; text-align:left;">Decesive choice</label>
			
				<button @click="addOption" style="width: 10%"><font-awesome-icon icon="plus" /></button>
				<button @click="save" style="width: 10%"><font-awesome-icon icon="save" /></button>
			</div>
		</div>
	</div>
</template>

<script>
import NavData from '../../mixins/NavData.js'

import { interactionService, INTERACTION_TYPE } from '../../services/InteractionService.js'

const newOption = {
	title: "",
	traitChange: "",
	traitValue: null,
	jumpToIndex: -1
};

export default {
	name: 'ChoiceEdit',
	mixins: [
		NavData
	],
	props: {
		interactionIndex: Number,
		nodeChildren: Array
	},
	data() {
		return {
			collection: "traits",
			keepCache: true,
			clearCache: false,
			editMode: false,
			isDecisive: false,
			options: []
		}
	},
	computed: {
		traits() {
			return this.loadedData || [];
		}
	},
	methods: {
		addChoice() {
			this.editMode = true;
			this.addOption();
		},
		addOption() {
			let option = interactionService.adapters[INTERACTION_TYPE.OPTION].create(newOption);
			this.options.push(option);
		},
		save() {
			this.isEditing = false;
			this.$emit("addChoice", {
				index: this.interactionIndex,
				choice: {
					options: this.options, 
					isDecisive: this.isDecisive
				}
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
hr {
	margin: 0px;
	padding: 0px;
}

.interval {
	height: 5px;
}

.interval:hover {
	height: 20px;
	background-color: gray;
}

.optionContainer {
	display: flex;
}
</style>