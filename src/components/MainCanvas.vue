<template>
	<div>
		<nav>
			<button v-for="view in views" class="button" 
				v-bind:key="view"
				v-bind:class="{ active: currentView === view }"
				v-on:click="currentView = view">{{view}}</button>
		</nav>

		<ToolBox></ToolBox>

		<component :is="currentView" :collection="collection"></component>
	</div>
</template>

<script>
import { COLLECTION } from '../services/DataService.js'

import ToolBox from './ToolBox.vue'
import NavHistory from './NavHistory.vue'
import NavTree from './NavTree.vue'
import NavCharacter from './NavCharacter.vue'

export default {
	name: 'MainCanvas',
	components: {
		ToolBox,
		NavHistory,
		NavTree,
		NavCharacter
	},
	data() {
		return {
			currentView: 'NavHistory',
			views: ['NavHistory', 'NavTree', 'NavCharacter']
		}
	},
	computed: {
		collection() {
			let collectionByView = [COLLECTION.HISTORIES, COLLECTION.TREES, COLLECTION.CHARACTERS];
			return collectionByView[this.views.indexOf(this.currentView)];
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>