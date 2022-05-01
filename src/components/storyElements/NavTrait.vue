<template>
	<v-container>
		<v-row>
			<template v-for="(trait, index) in traits">
				<v-col :key="trait.id">
					<v-card class="pa-2" outlined tile>
						<v-container style="display: flex;">
							<TitleInput :title="trait.name" :titleStyle="{ 'font-weight': 'bold', 'font-size': '24px' }" @save="trait.name = $event"></TitleInput>
							<v-btn class="button-clear button-icon" @click="remove(trait)">
								<font-awesome-icon icon="times" />
							</v-btn>
						</v-container>
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
		
		<Toolbox :nbUndos="modificationHistory.length" @toolAdd="add" @toolUndo="undo" @toolSave="_save" @toolUpload="upload"></Toolbox>
	</v-container>
</template>

<script>
import NavData from '../../mixins/NavData.js'

import TitleInput from '../generic/TitleInput.vue'
import ListInput from '../generic/ListInput.vue'
import Toolbox from '../generic/Toolbox.vue'

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
	methods: {
		_save() {
			this.loadedData.forEach(t => t.steps.sort((a,b) => b.value - a.value));

			this.save();
		}
	},
	destroyed() {
		this._save();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.char-card {
	
}
</style>