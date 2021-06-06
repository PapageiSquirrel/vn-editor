<template>
	<div>
		<div v-for="hist in histories" :key="hist.id" class="card-bordered" :class="{ selected: isSelectedStory(hist) }" style="display: flex;">
			<button class="button-clear button-icon" @click="select(hist)">
				<font-awesome-icon icon="thumbtack" />
			</button>
			<div style="width: 100%;">
				<div style="display: flex;">
					<TitleInput :title="hist.name" 
						:titleStyle="{ 'font-weight': 'bold', 'font-size': '24px' }" 
						:isClickEdit="false" @save="hist.name = $event"  style="width: 100%;"></TitleInput>
					<button class="button-clear button-icon" @click="remove(hist)" style="float: right;">
						<font-awesome-icon icon="times" />
					</button>
				</div>
				<textarea v-model="hist.description"></textarea>
			</div>
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