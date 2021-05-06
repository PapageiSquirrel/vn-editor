<template>
	<div>
		<div v-for="hist in histories" :key="hist.id" class="card-bordered" :class="{ selected: isSelectedStory(hist) }">
			<TitleInput :title="hist.name" :isClickEdit="false" @save="hist.name = $event"></TitleInput>
			<TitleInput :title="hist.description" :isClickEdit="false" @save="hist.description = $event"></TitleInput>
			<button class="button-flat button-clear" @click="select(hist)">Select this story</button>
			<button class="button-flat button-clear" @click="remove(hist)">Delete this story</button>
		</div>

		<button class="button-flat button-clear" @click="add()">Create a new story</button>
		<button class="button-flat button-clear" @click="save()">Save your stories</button>
	</div>
</template>

<script>
import { cacheService, CACHE_TYPE, CACHE_KEY } from '../services/CacheService.js'

import NavData from '../mixins/NavData.js'

import TitleInput from './generic/TitleInput.vue'

export default {
	name: 'NavHistory',
	mixins: [
		NavData
	],
	components: {
		TitleInput
	},
	data() {
		return {
			collection: "histories",
			selectedHistory: null
		}
	},
	computed: {
		histories() {
			return this.loadedData;
		}
	},
	methods: {
		select(value) {
			this.selectedHistory = value;
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
.hist-card {
	
}
.selected {
	background-color: #CCC;
}
</style>