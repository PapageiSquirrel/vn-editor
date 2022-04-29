<template>
	<v-main>
		<v-navigation-drawer v-model="drawer" permanent absolute :mini-variant.sync="mini">
			<v-list>
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
				<v-list-group v-for="view in views" 
					:key="view.component"
					:disabled="!storyOverview"
					v-model="view.active"
					:append-icon="null"
					no-action
					@click="selectView(view)">
					<template v-slot:activator>
						<v-list-item-icon>
							<font-awesome-icon :icon="view.icon" />
						</v-list-item-icon>
						<v-list-item-title v-text="view.label"></v-list-item-title>
					</template>
					<v-flex v-if="view.subs.length">
						<template v-if="view.isMultiple">
							<v-list>
								<v-list-item v-for="sub in view.subs" :key="sub.id">
									<v-switch  :label="sub.label" v-model="sub.value" 
										@change="changeSubOption(sub)"></v-switch>
								</v-list-item>
							</v-list>
						</template>

						<template v-else>
							<v-list>
								<v-list-item-group mandatory>
									<v-list-item v-for="sub in view.subs" :key="sub.id" @click="selectOption(sub, view)">
										<v-list-item-icon>
											<font-awesome-icon :icon="sub.icon" />
										</v-list-item-icon>
										<v-list-item-title v-text="sub.label"></v-list-item-title>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</template>
					</v-flex>
				</v-list-group>
			</v-list>
		</v-navigation-drawer>

		<component :is="currentView" v-bind="viewOptions" @storyChange="onStoryChange"></component>
	</v-main>
</template>

<script>
import NavHistory from './NavHistory'
import NavStoryElements from './NavStoryElements'
import NavTree from './NavTree'

export default {
	name: 'MainCanvas',
	components: {
		NavHistory,
		NavStoryElements,
		NavTree
	},
	data() {
		return {
			currentView: 'NavHistory',
			views: [
				{label: "Stories", component: 'NavHistory', active: true, icon: "scroll", subs: []}, 
				{label: "Story Elements", component: 'NavStoryElements', icon: "puzzle-piece", option:"currentStoryElement", isMultiple: false, subs: [
					{id:'sub21', label:"Characters", value: "NavCharacter", icon: "user-plus"}, 
					{id:"sub22", label:"Traits", value: "NavTrait", icon: "brain"},
					{id:"sub23", label:"Locations", value: "NavLocation", icon: "map"}
				]},
				{label: "Dialog Tree", component: 'NavTree', icon: "code-branch", isMultiple: true, subs: [
					{id:'sub31', option:'showTree', label:'Tree', value: true}, 
					{id:"sub32", option:"showDialogs", label:"Dialogs",  value: true},
					{id:"sub33", option:"showTriggers", label:"Triggers",  value: false},
					{id:"sub34", option:"showExplorations", label:"Explorations", value: false}
				]}
			],
			viewOptions: {},
			storyOverview: null,
			drawer: true,
			mini: false
		}
	},
	computed: {
		subOptions() {
			return Object.assign({}, this.viewOptions);
		}
	},
	methods: {
		changeSubOption(sub) {
			this.viewOptions[sub.option] = !this.viewOptions[sub.option];
			this.viewOptions = {...this.viewOptions};
		},
		selectOption(sub, view) {
			this.viewOptions[view.option] = sub.value;
			this.viewOptions = {...this.viewOptions};
		},
		selectView(view) {
			if (this.currentView === view.component) {
				return;
			}

			if (view.isMultiple) {
				view.subs.forEach(s => this.viewOptions[s.option] = s.value);
			} else {
				this.viewOptions[view.option] = view.subs[0].value;
			}
			
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
.btn-toggle {
  flex-direction: column;
}

textarea {
	min-height: 16px;
	max-height: 240px;
	min-width: 5%;
	max-width: 99%;
	width: 99%;
	overflow-y: auto;
}
</style>