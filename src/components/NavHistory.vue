<template>
	<div>
		<div v-for="hist in histories" :key="hist.id" class="hist-card" :class="{ selected: selectedHistory && hist.id === selectedHistory.id }">
			<TitleInput :title="hist.name"></TitleInput>
			<TitleInput :title="hist.description"></TitleInput>
			<button class="button-flat button-clear" @click="select(hist)">Select this story</button>
			<button class="button-flat button-clear" @click="remove(hist)">Delete this story</button>
		</div>

		<button class="button-flat button-clear" @click="add">Create a story</button>
		<button class="button-flat button-clear" @click="save(selectedHistory)">Save your stories</button>
	</div>
</template>

<script>
import NavData from '../mixins/NavData.js'

import TitleInput from './TitleInput.vue'

export default {
	name: 'NavHistory',
	mixins: [
		NavData
	],
	components: {
		TitleInput
	},
	data() {
		return {
			selectedHistory: null
		}
	},
	computed: {
		histories() {
			return this.loadedData;
		}
	},
	methods: {
		select(value) {
			this.selectedHistory = value;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hist-card {
	margin: 10px;
	border: solid 1px black;
}
.selected {
	background-color: #CCC;
}
</style>