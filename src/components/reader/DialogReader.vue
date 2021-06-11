<template>
	<div class="grid-container">
		<div class="portrait" style="grid-row: 1 / span 2;  grid-column: 1 / span 2;">

		</div>

		<div class="interactionContainer" style="grid-row: 1; grid-column: 3 / span 8;">
			<ul>
				<li v-for="(d, index) in interactionHistory" :key="index" class="dialog"
					:class="{ mainDialog: d.character === mainCharacter.name, otherDialog: d.character !== mainCharacter.name }">
					<div :style="{ 'grid-area': d.character === mainCharacter.name ? 'left' : 'right' }">
						<div class="char">
							<b :class="{ mainDialogChar: d.character === mainCharacter.name, otherDialogChar: d.character !== mainCharacter.name }">{{d.character}}</b>
						</div>
						<div class="text dialogBox" :class="{ mainDialogBox: d.character === mainCharacter.name, otherDialogBox: d.character !== mainCharacter.name }">{{d.text}}</div>
					</div>
				</li>
			</ul>
		</div>

		<ul class="choiceBox" style="grid-row: 2; grid-column: 3 / span 8;" v-show="isChoiceNeeded">
			<li v-for="(option, index) in choiceOptions" :key="option.id" class="choice">
				<button class="button-flat button-clear" @click="makeAChoice(index, option)">{{ option.title }}</button>
			</li>
		</ul>

		<div class="portrait" style="grid-row: 1 / span 2; grid-column: 11 / span 2;">

		</div>
	</div>
</template>

<script>
import DataLoader from '../../mixins/DataLoader.js'

export default {
	name: 'DialogReader',
	mixins: [
		DataLoader
	],
	props: {
		storyId: Number
	},
	data() {
		return {
			params: null,
			collections: ["trees", "characters", "traits"],
			interactionCursor: 0,
			interactionHistory: []
		}
	},
	computed: {
		tree() {
			return this.loadedDatas && this.loadedDatas[0];
		},
		characters() {
			return this.loadedDatas && this.loadedDatas[1];
		},
		traits() {
			return this.loadedDatas && this.loadedDatas[2];
		},
		treeNode() {
			return this.tree && this.tree.getCurrentNode();
		},
		interactions() {
			return this.treeNode && this.treeNode.interactions;
		},
		currentInteraction() {
			return this.interactions && this.interactions[this.interactionCursor];
		},
		choiceOptions() {
			return this.isChoiceNeeded && this.currentInteraction.value.options;
		},
		mainCharacter() {
			return this.characters[0];
		},
		isChoiceNeeded() {
			return this.currentInteraction && this.currentInteraction.type === "choice";
		}
	},
	methods: {
		showNextInteraction() {
			if (!this.loadedDatas) {
				return;
			}

			if (!this.currentInteraction) {
				if (this.tree) {
					this.tree.goNext();
				}
				this.interactionCursor = 0;
			}

			if (!this.currentInteraction) {
				return;
			}

			if (this.currentInteraction.type === "dialog") {
				this.interactionHistory.push(this.currentInteraction.value);
				this.interactionCursor++;
			}
		},
		makeAChoice(index, option) {
			this.interactionHistory.push({character: this.mainCharacter.name, text: option.title});
			this.currentInteraction.value.isDecisive ? this.tree.goTo([this.currentInteraction.value.index, index]) : this.interactionCursor++;
		}
	},
	created() {
		window.addEventListener('click', this.showNextInteraction);
		this.params = this.storyId;
	},
	destroyed() {
		window.removeEventListener('click', this.showNextInteraction);
	}
}
</script>

<style lang="css" scoped>
ul {
	padding: 0px;
	list-style:none;
	vertical-align: bottom;
}

li {
	display: block;
	bottom: 0px;
}

.grid-container {
	display: grid;
}

.interactionContainer {
	display: flex;
	width: 100%;
	height: 320px;
	max-height: 320px;
	overflow-y: hidden;
	flex-direction: column-reverse;
	scrollbar-color: var(--font-color);
	scrollbar-width: thin;
}
.interactionContainer:hover {
	padding-right: -8px;
	overflow-y: auto;
}

.choiceBox {
	margin: 2px;
	border: solid 1px black;
}

.portrait {
	background-color: var(--secondary-color);
	border: solid black 3px;
}

.dialog {
	margin: 5px 0px;
	padding: 10px;
	display: grid;
	grid-template-areas: 'left right';
}

.choice {
	padding: 5px;
}

.mainDialog {
	text-align: left;
}

.otherDialog {
	text-align: right;
}

.mainDialogBox {
	text-align: center;
	min-height: 28px;
	border: solid #193645 1px;
	background-color: #939bb8;
	color: #193645;
}

.mainDialogChar {
	border: solid #193645 2px;
	background-color: #939bb8;
	color: #193645;
}

.otherDialogBox {
	text-align: center;
	border: solid #3c4519 1px;
	background-color: #b9c297;
	color: #3c4519;
}

.otherDialogChar {
	border: solid #3c4519 2px;
	background-color: #b9c297;
	color: #3c4519;
}
</style>