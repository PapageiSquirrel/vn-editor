<template>
	<v-app id="app">
		<v-app-bar app>
			<v-spacer></v-spacer>
			<v-toolbar-title v-if="!!storyOverview">
				<h1 style="letter-spacing: 3px; text-align: center;">{{ storyOverview ? storyOverview.name : "" }}</h1>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn v-for="view in views"
				:key="view.component"
				:class="{ activeMode: currentView === view.component, modeHover: currentView !== view.component }"
				@click="currentView = view.component">
				<font-awesome-icon :icon="view.label === 'Editor' ? 'edit' : 'book-reader'" style="margin-right: 10px;" /> {{view.label}}
			</v-btn>
		</v-app-bar>
		
		<component :is="currentView" @storyChange="onStoryChange"></component>
	</v-app>
</template>

<script>
// VUES
import MainCanvas from './components/MainCanvas.vue'

import StoryCanvas from './components/reader/StoryCanvas.vue'

export default {
	name: 'app',
	components: {
		MainCanvas,
		StoryCanvas
	},
	data() {
		return {
			views: [
				{label: "Editor", component:"MainCanvas" }, 
				{label: "Reader", component:"StoryCanvas"}
			],
			currentView: "MainCanvas",
			storyOverview: null
		}
	},
	methods: {
		onStoryChange(data) {
			this.storyOverview = data;
		}
	},
	created() {
		document.documentElement.setAttribute('data-theme', 'dark');
	}
}
</script>

<style type="less">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

/************** MARKUP *****************/
.toolbox {
	margin: 10px;
}

/* MODAL */
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	background: #FFFFFF;
	box-shadow: 2px 2px 20px 1px;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
}

</style>