<template>
	<div>
		<nav>
			<button v-for="view in views" class="button"  style="width: 50%"
				:key="view"
				:class="{ active: currentView === view }"
				:disabled="!storyOverview"
				@click="currentView = view">{{view}}</button>
		</nav>

		<div v-if="!!storyOverview" class="card-bordered">
			<h3>{{ storyOverview ? storyOverview.name : "" }}</h3>
		</div>

		<ToolBox></ToolBox>

		<component :is="currentView" :clearCache="clearCache" @storyChange="onStoryChange"></component>
	</div>
</template>

<script>
import { COLLECTION } from '../services/DataService.js'

import ToolBox from './ToolBox.vue'
import NavHistory from './NavHistory.vue'
import NavTree from './NavTree.vue'
import NavCharacter from './NavCharacter.vue'
import NavTrait from './NavTrait.vue'

export default {
	name: 'MainCanvas',
	components: {
		ToolBox,
		NavHistory,
		NavTree,
		NavCharacter,
		NavTrait
	},
	data() {
		return {
			currentView: 'NavHistory',
			views: ['NavHistory', 'NavTree', 'NavCharacter', 'NavTrait'],
			storyOverview: null
		}
	},
	computed: {
		clearCache() {
			return [COLLECTION.CHARACTERS, COLLECTION.TRAITS].includes(this.collection);
		}
	},
	methods: {
		onStoryChange(data) {
			this.storyOverview = data;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>