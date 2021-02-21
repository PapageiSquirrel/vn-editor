<template>
	<div>
		<hr>
		<div class="interval" @click="newDialog()">
			
		</div>
		<div v-if="isEditing">
			<select v-model="character">
				<option v-for="c in characters" :key="c">{{c}}</option>
			</select>
			<select v-model="mood">
				<option v-for="m in character.moods" :key="m">{{m}}</option>
			</select>
			<input type="text" v-model="text" />
			<button @click="save">Ok</button>
		</div>
		<hr>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'DialogEdit',
	props: {
		dialogIndex: Number
	},
	data() {
		return {
			isEditing: false,
			character: null,
			characters: [],
			mood: "",
			text: ""
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
	},
	created() {
		axios.get("http://localhost:45050/api/characters").then(result => {
			if (result.status === 200) {
				this.characters = result.data;
			}
		});
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
	background-color: gray;
}
</style>