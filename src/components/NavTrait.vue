<template>
	<v-container>
		<v-row>
			<template v-for="(trait, index) in traits">
				<v-col :key="trait.id">
					<v-card class="pa-2" outlined tile>
						<TitleInput :title="trait.name" :titleStyle="{ 'font-weight': 'bold', 'font-size': '24px' }" @save="trait.name = $event"></TitleInput>
						<ListInput :elements="trait.steps" :elType="'step'" :elKey="'name'">
							<template v-slot:default="slotProps">
								<v-text-field type="number" v-model="slotProps.element.value" style="margin-left: 5%; margin-right: 5%;" />
							</template>
						</ListInput>
					</v-card>
				</v-col>

				<v-responsive v-if="index % 2 === 1" :key="`width-${index}`" width="100%"></v-responsive>
			</template>
		</v-row>	
		
		<Toolbox :nbUndos="modificationHistory.length" @toolAdd="add" @toolUndo="undo" @toolSave="save" @toolUpload="upload"></Toolbox>
	</v-container>
</template>

<script>
import NavData from '../mixins/NavData.js'

import TitleInput from './generic/TitleInput.vue'
import ListInput from './generic/ListInput.vue'
import Toolbox from './generic/Toolbox.vue'

export default {
	name: 'NavTrait',
	mixins: [
		NavData
	],
	components: {
		TitleInput,
		ListInput,
		Toolbox
	},
	data() {
		return {
			collection: "traits",
			keepCache: true,
			clearCache: true
		}
	},
	computed: {
		traits() {
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
.char-card {
	
}
</style>