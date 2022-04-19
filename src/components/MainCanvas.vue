<template>
	<v-main>
		<v-navigation-drawer v-model="drawer" permanent absolute :mini-variant.sync="mini">
			<v-list-item>
				<v-list-item-icon>
					<font-awesome-icon icon="tv" />
				</v-list-item-icon>
				<v-list-item-content>Edit Mode</v-list-item-content>
				<v-btn icon @click.stop="mini = !mini">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
			</v-list-item>
			<v-divider></v-divider>
			<v-list-item v-for="view in views"
				:key="view.component"
				:class="{ navActive: currentView === view.component }"
				:disabled="!storyOverview"
				@click="selectView(view)">
				<v-list-item-icon>
					<font-awesome-icon :icon="view.icon" />
				</v-list-item-icon>
				<v-list-item-content v-show="currentView !== view.component">{{view.label}}</v-list-item-content>

				<v-list v-show="currentView === view.component">
					<v-list-item-title>{{view.label}}</v-list-item-title>
					<v-list-item v-for="sub in view.subs" :key="sub.id">
						<v-switch :label="sub.label" value input-value="true" 
							@change="changeSubOption(sub)"></v-switch>
					</v-list-item>
				</v-list>
			</v-list-item>
		</v-navigation-drawer>

		<component :is="currentView" :clearCache="clearCache" v-bind="viewOptions" @storyChange="onStoryChange"></component>
	</v-main>
</template>

<script>
import { COLLECTION } from '../services/DataService.js'

import NavHistory from './NavHistory.vue'
import NavTree from './NavTree.vue'
import NavCharacter from './NavCharacter.vue'
import NavTrait from './NavTrait.vue'

export default {
	name: 'MainCanvas',
	components: {
		NavHistory,
		NavTree,
		NavCharacter,
		NavTrait
	},
	data() {
		return {
			currentView: 'NavHistory',
			views: [
				{label: "Stories", component: 'NavHistory', icon: "scroll", subs: []}, 
				{label: "Dialog Tree", component: 'NavTree', icon: "code-branch", subs: [
					{id:'sub21', option:'showTree', label:'Tree'}, 
					{id:"sub22", option:"showDialogs", label:"Dialogs"},
					{id:"sub23", option:"showTriggers", label:"Triggers"},
					{id:"sub24", option:"showExplorations", label:"Explorations"}
				]}, 
				{label: "Characters", component: 'NavCharacter', icon: "user-plus", subs: []}, 
				{label: "Traits", component: 'NavTrait', icon: "brain", subs: []}
			],
			viewOptions: {},
			storyOverview: null,
			drawer: true,
			mini: false
		}
	},
	computed: {
		clearCache() {
			return [COLLECTION.CHARACTERS, COLLECTION.TRAITS].includes(this.collection);
		},
		subOptions() {
			return Object.assign({}, this.viewOptions);
		}
	},
	methods: {
		changeSubOption(sub) {
			this.viewOptions[sub.option] = !this.viewOptions[sub.option];
			this.viewOptions = {...this.viewOptions};
		},
		selectView(view) {
			if (this.currentView === view.component) {
				return;
			}
			view.subs.forEach(s => this.viewOptions[s.option] = true);
			this.currentView = view.component;
		},
		onStoryChange(data) {
			this.storyOverview = data;
			this.$emit("storyChange", data);
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
	overflow-y: auto;
}
</style>