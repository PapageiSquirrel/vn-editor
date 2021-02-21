<template>
	<div>
		<div v-for="char in characters" :key="char.name" class="char-card">
			<TitleInput :title="char.name"></TitleInput>
			<TitleInput :title="char.description"></TitleInput>
		</div>

		<button class="button-flat button-clear" @click="add">Add a character to the story</button>
		<button class="button-flat button-clear" @click="save">Save your characters</button>
	</div>
</template>

<script>
import NavData from '../mixins/NavData.js'

import TitleInput from './TitleInput.vue'

export default {
	name: 'NavCharacter',
	mixins: [
		NavData
	],
	components: {
		TitleInput
	},
	props: {
		historyId: Number
	},
	computed: {
		characters() {
			return this.loadedData;
		}
	},
	methods: {
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.char-card {
	border: solid black 1px;
}
</style>