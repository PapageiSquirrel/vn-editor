<template>
	<div>
		<nav>
			<button v-for="view in views" class="button-primary-nohover nav-button" style="width: 25%"
				:key="view.component"
				:class="{ navActive: currentView === view.component }"
				:disabled="!storyOverview"
				@click="currentView = view.component">{{view.label}}</button>
		</nav>

		<div v-if="!!storyOverview" class="card-bordered">
			<h1 style="letter-spacing: 3px; text-align: center;">{{ storyOverview ? storyOverview.name : "" }}</h1>
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
			views: [
				{label: "Stories", component: 'NavHistory'}, 
				{label: "Dialog Tree", component: 'NavTree'}, 
				{label: "Characters", component: 'NavCharacter'}, 
				{label: "Traits", component: 'NavTrait'}
			],
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
textarea {
	min-height: 16px;
	max-height: 240px;
	min-width: 5%;
	max-width: 99%;
	width: 99%;
	background-color: var(--secondary-color);
	overflow-y: auto;
}

.nav-button {

}
.nav-button:active:not([disabled]) {
	background-color: var(--secondary-color);
}
.nav-button:active:hover:not([disabled]) {
	background-color: var(--secondary-color);
}
.navActive {
	background-color: var(--secondary-color);
}
</style>