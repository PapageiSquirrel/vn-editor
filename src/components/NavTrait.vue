<template>
	<div style="display: flex;">
		<div v-for="trait in traits" :key="trait.id" class="card-bordered" style="width: 40%">
			<TitleInput :title="trait.name" @save="trait.name = $event"></TitleInput>
			<ListInput :elements="trait.steps" :elType="'step'" :elKey="'name'">
				<template v-slot:default="slotProps">
					<input type="number" v-model="slotProps.element.value" style="margin-left: 5%; margin-right: 5%;" />
				</template>
			</ListInput>
		</div>

		<ToolboxItem :nbUndos="modificationHistory.length" @toolAdd="add" @toolUndo="undo" @toolSave="save" @toolUpload="upload"></ToolboxItem>
		<!--
		<div class="toolbox">
			<button class="button-flat button-clear" @click="add()">Add a trait to the story</button>
			<button class="button-flat button-clear" @click="save()">Save your traits</button>
		</div>
	-->
	</div>
</template>

<script>
import NavData from '../mixins/NavData.js'

import TitleInput from './generic/TitleInput.vue'
import ListInput from './generic/ListInput.vue'
import ToolboxItem from './generic/ToolboxItem.vue'

export default {
	name: 'NavTrait',
	mixins: [
		NavData
	],
	components: {
		TitleInput,
		ListInput,
		ToolboxItem
	},
	data() {
		return {
			collection: "traits"
		}
	},
	computed: {
		traits() {
			return this.loadedData;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.char-card {
	
}
</style>