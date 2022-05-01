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
											<v-card v-for="c in storyCharacters(hist.id)" :key="c.id">{{c.name}}</v-card>
										</v-card-text>
									</v-card>
								</v-col>

								<v-col cols="6">
									<v-card>
										<v-card-title>Traits</v-card-title>

										<v-card-text>
											<v-card v-for="t in storyTraits(hist.id)" :key="t.id">{{t.name}}</v-card>
										</v-card-text>
									</v-card>
								</v-col>

								<v-col cols="12">
									<v-card>
										<v-card-title>Locations</v-card-title>

										<v-card-text>
											<v-card v-for="l in storyLocations(hist.id)" :key="l.id">{{l.name}}</v-card>
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
			collections: ["characters", "locations", "traits", "triggers"],
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
		locations() {
			return this.loadedDatas && this.loadedDatas[1];
		},
		traits() {
			return this.loadedDatas && this.loadedDatas[2];
		},
		triggers() {
			return this.loadedDatas && this.loadedDatas[3]
		}
	},
	methods: {
		storyCharacters(storyId) {
			return this.characters && this.characters[storyId];
		},
		storyLocations(storyId) {
			return this.locations && this.locations[storyId];
		},
		storyTraits(storyId) {
			return this.traits && this.traits[storyId];
		},
		storyTriggers(storyId) {
			return this.triggers && this.triggers[storyId];
		},
		select(value) {
			let cacheStory = cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.STORY);
			if (cacheStory && value && cacheStory.id === value.id) {
				this.selectedHistory = value;
				this.$emit("storyChange", this.selectedHistory);
				return;
			}

			this.selectedHistory = value;
			try {
				cacheService.clearCache(CACHE_TYPE.APP);
				cacheService.addToMultipleCache([CACHE_TYPE.APP, CACHE_TYPE.SESSION], CACHE_KEY.HISTORY_IDENTIFIER, parseInt(this.selectedHistory.id, 10));
				cacheService.addToCache(CACHE_TYPE.SESSION, CACHE_KEY.STORY, JSON.stringify(this.selectedHistory));
				cacheService.addToCache(CACHE_TYPE.SESSION, CACHE_KEY.STORY_CHARACTERS, JSON.stringify(this.storyCharacters(this.selectedHistory.id)));
				cacheService.addToCache(CACHE_TYPE.SESSION, CACHE_KEY.STORY_LOCATIONS, JSON.stringify(this.storyLocations(this.selectedHistory.id)));
				cacheService.addToCache(CACHE_TYPE.SESSION, CACHE_KEY.STORY_TRAITS, JSON.stringify(this.storyTraits(this.selectedHistory.id)));
				cacheService.addToCache(CACHE_TYPE.SESSION, CACHE_KEY.STORY_TRIGGERS, JSON.stringify(this.storyTriggers(this.selectedHistory.id)));
			} catch(e) {
				console.log(e); // eslint-disable-line no-console
			}
			this.$emit("storyChange", this.selectedHistory);
		},
		isSelectedStory(hist) {
			return this.selectedHistory && this.selectedHistory.id === hist.id;
		}
	},
	created() {
		let cacheStory = cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.STORY);
		this.select(cacheStory);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>