<template>
	<div>
		<div v-show="!editMode">
			<ul>
				<li v-for="option in options" :key="option.title">{{ option.title + "(" + option.traitChange + " " + option.valueChange + ")" }}</li>
			</ul>

			<button @click="addChoice">{{ options.length > 0 ? "Edit choice" : "Add a choice" }}</button>
		</div>

		<div v-show="editMode">
			<div v-show="options.length > 0" v-for="option in options" :key="option.title">
				<input type="text" v-model="option.title" />
				<select v-model="option.traitChange">
					<option v-for="t in traits" :key="t.id">{{t.name}}</option>
				</select>
				<input type="number" v-model="option.traitValue" />
				<input type="text" v-model="option.triggerName" />
			</div>
			
			<button @click="addOption">Add an option</button>
			<button @click="save">Save choice</button>
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
		nodeChildren: Array
	},
	data() {
		return {
			collection: "traits",
			editMode: false,
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
			this.options.push(interactionService.adapters[INTERACTION_TYPE.OPTION].create(newOption));
		},
		save() {
			this.isEditing = false;
			this.$emit("addChoice", this.options);
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
</style>