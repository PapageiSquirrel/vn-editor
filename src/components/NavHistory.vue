<template>
	<v-container>
		<v-row dense>
			<v-col cols="12" v-for="hist in histories" :key="hist.id">
				<v-card elevation="3" outlined :class="{ selected: isSelectedStory(hist) }">
					<v-card-title>
						<TitleInput :title="hist.name" 
							:titleStyle="{ 'font-weight': 'bold', 'font-size': '24px' }" 
							:isClickEdit="false" @save="hist.name = $event"></TitleInput>
					</v-card-title>
					
					<v-card-text>
						<v-container>
							<v-row dense>
								<v-col cols="12">
									<v-textarea v-model="hist.description" rows="1"></v-textarea>
								</v-col>

								<v-col cols="6">
									<v-card>
										<v-card-title>Characters</v-card-title>

										<v-card-text>
											<v-card v-for="c in characters && characters[hist.id]" :key="c.id">{{c.name}}</v-card>
										</v-card-text>
									</v-card>
								</v-col>

								<v-col cols="6">
									<v-card>
										<v-card-title>Traits</v-card-title>

										<v-card-text>
											<v-card v-for="t in traits && traits[hist.id]" :key="t.id">{{t.name}}</v-card>
										</v-card-text>
									</v-card>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn dark @click="select(hist)">
							<font-awesome-icon icon="thumbtack" style="margin: 10px;" /> Select
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn @click="remove(hist)">
							<font-awesome-icon icon="times" style="margin: 10px;" /> Delete
						</v-btn>
						<v-spacer></v-spacer>
					</v-card-actions>		
				</v-card>
			</v-col>
		</v-row>

		<Toolbox :isLight="true" :nbUndos="modificationHistory.length" @toolAdd="add" @toolSave="save"></Toolbox>
	</v-container>
</template>

<script>
import { cacheService, CACHE_TYPE, CACHE_KEY } from '../services/CacheService.js'
import { PARAMETER } from '../services/DataService.js'

import NavData from '../mixins/NavData.js'
import DataLoader from '../mixins/DataLoader.js'

import TitleInput from './generic/TitleInput.vue'
import Toolbox from './generic/Toolbox.vue';

export default {
	name: 'NavHistory',
	mixins: [
		NavData,
		DataLoader
	],
	components: {
		TitleInput,
		Toolbox
	},
	data() {
		return {
			collection: "histories",
			collections: ["characters", "traits"],
			selectedHistory: null,
			params: PARAMETER.ALL
		}
	},
	computed: {
		histories() {
			return this.loadedData;
		},
		characters() {
			return this.loadedDatas && this.loadedDatas[0];
		},
		traits() {
			return this.loadedDatas && this.loadedDatas[1];
		}
	},
	methods: {
		select(value) {
			this.selectedHistory = value;
			cacheService.clearCache(CACHE_TYPE.APP);
			cacheService.addToMultipleCache([CACHE_TYPE.APP, CACHE_TYPE.SESSION], CACHE_KEY.HISTORY_IDENTIFIER, parseInt(this.selectedHistory.id, 10));
			this.$emit("storyChange", this.selectedHistory);
		},
		isSelectedStory(hist) {
			return this.selectedHistory && this.selectedHistory.id === hist.id;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>