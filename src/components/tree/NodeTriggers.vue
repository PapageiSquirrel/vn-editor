<template>
	<v-container>
		<v-row>
			<ListInput :elements="triggers" :elType="'trigger'" :elKey="'name'"></ListInput>
		</v-row>	
	</v-container>
</template>

<script>
import NavData from '../../mixins/NavData.js'
import ListInput from '../generic/ListInput.vue'

export default {
	name: 'NodeTriggers',
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