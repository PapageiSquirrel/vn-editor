<template>
	<div style="display:flex;">
		<v-select v-model="character" :items="characters" item-text="name" item-value="name" label="Character" />
		<v-select v-model="mood" :items="moods" :disabled="!character" item-text="type" item-value="type" label="Mood" />
		<v-text-field v-model="text" label="Text" />
		<v-btn fab color="primary" @click="save"><font-awesome-icon icon="save" /></v-btn>
	</div>
</template>

<script>
import { cacheService, CACHE_TYPE, CACHE_KEY } from '../../services/CacheService'

export default {
	name: 'DialogEdit',
	props: {
		defaultCharacter: String,
		defaultMood: String,
		defaultText: String,
		interactionIndex: Number
	},
	data() {
		return {
			isEditing: false,
			character: "",
			mood: "",
			text: "",
			characters: []
		}
	},
	computed: {
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
		let storyCharacters = cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.STORY_CHARACTERS);
		this.characters = storyCharacters || [];

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