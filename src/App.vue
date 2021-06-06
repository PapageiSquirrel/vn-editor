<template>
	<div id="app">
		<nav>
			<button v-for="view in views" class="button-mode"  style="width: 50%"
				:key="view.component"
				:class="{ activeMode: currentView === view.component, modeHover: currentView !== view.component }"
				@click="currentView = view.component">{{view.label}}</button>
		</nav>
		
		<component :is="currentView"></component>
	</div>
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
				{label: "Visual Novel Editor", component:"MainCanvas" }, 
				{label: "Visual Novel Reader", component:"StoryCanvas"}
			],
			currentView: "MainCanvas"
		}
	}
}
</script>

<style type="less">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 60px;
}

.light-theme {
	background-color: #FFF;
	color: #000;
}

.dark-theme {
	background-color: #777;
	color: #ccc;
}

input {
	width: 100%;
}

.activeMode {
	background-color: #7d8b8c;
	color: white;
}

.button-mode {

}
.modeHover:hover {
	background-color: #b7c8c9;
}


.button, .button-flat {
	width: 100%;
	text-align: center;
	border-radius: 5px;
	text-decoration: none;
	font-size: 16px;
	outline: none;
	transition: all 0.3s;
}
.button-icon {
	width: 5%;
	min-width: 30px;
	max-width: 40px;
}

.button-clear {
	background-color: #fff;
	border: none;
}
.button-clear:hover {
	background-color: #7d8b8c;
	color: white;
}

.button-white {
	border: 1px solid #35397a;
	background-color: #fff;
	color: #35397a;
}
.button-white:hover {
	background-color: #35397a;
	color: white;
}

.button-blue-grey {
	border: none;
	background-color: #7d8b8c;
	color: white;
}
.button-blue-grey:hover {
	background-color: #abfffe;
	color: black;
}

.button-red {
	border: 1px solid #5c1e19;
	background-color: #ffc2bd;
	color: #5c1e19;
}
.button-red:hover {
	background-color: #5c1e19;
	color: #fff;
}

.button-green {
	border: 1px solid #345915;
	background-color: #c0e6a1;
	color: #345915;
	width: 5%;
	min-width: 30px;
	max-width: 40px;
}
.button-green:hover {
	background-color: #345915;
	color: #fff;
}

.shadowed {
	box-shadow: 10px 10px 5px grey;
}
.card-bordered {
	margin: 10px;
	border: solid 1px black;
}
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