<template>
	<div>
		<div class="interactionContainer">
			<ul>
				<li v-for="(d, index) in interactionHistory" :key="index">
					<div class="char"><b>{{d.character}}</b></div>
					<div class="text">{{d.text}}</div>
				</li>
			</ul>
		</div>

		<ul v-show="isChoiceNeeded">
			<li v-for="(option, index) in choiceOptions" :key="option.id">
				<button @click="makeAChoice(index, option)">{{ option.title }}</button>
			</li>
		</ul>
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
	list-style:none;
	vertical-align: bottom;
}

li {
	bottom: 0px;
}

.interactionContainer {
	height: 320px;
	max-height: 320px;
	overflow-y: hidden;
	display: flex;
	flex-direction: column-reverse;
}
</style>