<template>
	<v-container>
		<v-row dense>
			<ListInput :elements="triggers" :elType="'event'" :elKey="'name'"></ListInput>
		</v-row>

		<Toolbox :nbUndos="modificationHistory.length" @toolAdd="add" @toolUndo="undo" @toolSave="save"></Toolbox>
	</v-container>
</template>

<script>
import NavData from '../../mixins/NavData.js'
import ListInput from '../generic/ListInput.vue'

export default {
	name: 'NavTrigger',
	mixins: [
		NavData
	],
	components: {
		ListInput
	},
	data() {
		return {
			collection: "triggers",
			keepCache: true,
			clearCache: true
		}
	},
	computed: {
		triggers() {
			return this.loadedData;
		}
	},
	destroyed() {
		this.save();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>