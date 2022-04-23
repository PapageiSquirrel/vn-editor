<template>
	<div style="display:flex;">
		<v-select v-model="character" :items="characters" item-text="name" item-value="name" label="Character" />
		<v-select v-model="mood" :items="moods" :disabled="!character" item-text="type" item-value="type" label="Mood" />
		<v-text-field v-model="text" label="Text" />
		<v-btn fab color="primary" @click="save"><font-awesome-icon icon="save" /></v-btn>
	</div>
</template>

<script>
import NavData from '../../mixins/NavData.js'

export default {
	name: 'DialogEdit',
	mixins: [
		NavData
	],
	props: {
		defaultCharacter: String,
		defaultMood: String,
		defaultText: String,
		interactionIndex: Number
	},
	data() {
		return {
			collection: "characters",
			keepCache: true,
			clearCache: false,
			isEditing: false,
			character: "",
			mood: "",
			text: ""
		}
	},
	computed: {
		characters() {
			return this.loadedData || [];
		},
		moods() {
			let character = this.characters && this.characters.find(c => c.name === this.character);
			return character && character.moods || [];
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
				index: this.interactionIndex,
				dialog: {
					character: this.character,
					mood: this.mood,
					text: this.text
				}
			});
		}
	},
	created() {
		this.character = this.defaultCharacter || "";
		this.mood = this.defaultMood || "";
		this.text = this.defaultText || "";
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