<template>
	<div style="display:flex;">
		<select v-model="character" style="width: 20%">
			<option v-for="c in characters" :key="c.id">{{c.name}}</option>
		</select>
		<select v-model="mood" style="width: 20%">
			<option v-for="m in moods" :key="m.type">{{m.type}}</option>
		</select>
		<input type="text" v-model="text" style="width: 60%" />
		<button @click="save">Ok</button>
	</div>
</template>

<script>
import NavData from '../../mixins/NavData.js'

export default {
	name: 'InteractionEdit',
	mixins: [
		NavData
	],
	data() {
		return {
			collection: "characters",
			isEditing: false,
			character: null,
			mood: "",
			text: ""
		}
	},
	computed: {
		characters() {
			return this.loadedData || [];
		},
		moods() {
			return this.character && this.characters.moods || [];
		}
	},
	methods: {
		newDialog() {
			this.isEditing = true;
			this.character = "";
			this.mood = "";
			this.text = "";
		},
		save() {
			this.isEditing = false;
			this.$emit("addDialog", {
				index: this.dialogIndex,
				dialog: {
					character: this.character,
					mood: this.mood,
					text: this.text
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
</style>