<template>
	<div>
		<ul>
			<li v-for="d in dialogHistory">
				<div class="char"><b>{{d.character}}</b></div>
				<div class="text">{{d.text}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
import DataLoader from '../mixins/DataLoader.js'

import ChoiceMaker from './ChoiceMaker.vue'

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
			_params: null,
			_collections: ["trees", "characters", "traits"],
			dialogCursor: 0,
			dialogHistory: [],
			choice: null
		}
	},
	computed: {
		trees() {
			return this._loadedDatas[0];
		},
		characters() {
			return this._loadedDatas[1];
		},
		traits() {
			return this._loadedDatas[2];
		},
		tree() {
			return this.trees.find(t => t.storyId);
		},
		dialogs() {
			let node = this.tree.getCurrentNode();
			return node.dialogs;
		},
		currentDialog() {
			return this.dialogs[dialogCursor];
		}
	},
	methods: {
		showNextDialog() {
			this.dialogHistory.push(this.currentDialog);
			// TODO: Animate new dialog creation and text
			let hasGoneUp = this.tree.goNext();
			if (hasGoneUp) {
				this.choice = this.tree.choice
				dialogCursor = 0;
			} else {
				dialogCursor++;
			}
		}
	},
	created() {
		window.addEventListener('onclick', this.showNextDialog);
		this.params = this.storyId;
	},
	destroyed: function() {
		window.removeEventListener('onclick', this.showNextDialog);
	}
}
</script>

<style lang="css" scoped>

</style>