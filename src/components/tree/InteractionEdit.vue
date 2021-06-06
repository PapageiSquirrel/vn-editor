<template>
	<div>
		<hr>
		<div class="interval" @mouseover="isHovering = true" @mouseleave="isHovering = false">
			<button v-show="isHovering" class="button button-white" style="width: 50%" @click="newDialog()">Dialog</button>
			<button v-show="isHovering" class="button button-white" style="width: 50%" @click="newChoice()">Choice</button>
		</div>

		<div v-show="isEditing">
			<component :is="currentComponent" :keepCache="true" :interactionIndex="interactionIndex" @addChoice="onAddChoice" @addDialog="onAddDialog"  />
		</div>
		<hr>
	</div>
</template>

<script>
import ChoiceEdit from './ChoiceEdit.vue'
import DialogEdit from './DialogEdit.vue'

export default {
	name: 'InteractionEdit',
	components: {
		ChoiceEdit,
		DialogEdit
	},
	props: {
		interactionIndex: Number
	},
	data() {
		return {
			isEditing: false,
			isHovering: false,
			currentComponent: "ChoiceEdit"
		}
	},
	methods: {
		newDialog() {
			this.isEditing = true;
			this.currentComponent = "DialogEdit";
			this.$emit("newInteraction", this.interactionIndex);
		},
		newChoice() {
			this.isEditing = true;
			this.currentComponent = "ChoiceEdit";
			this.$emit("newInteraction", this.interactionIndex);
		},
		onAddChoice(event) {
			this.$emit("addChoice", event);
			this.isEditing = false;
		},
		onAddDialog(event) {
			this.$emit("addDialog", event);
			this.isEditing = false;
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