<template>
	<div>
		<button :disabled="!canGoUp" class="button button-icon" @click="up"><font-awesome-icon icon="angle-up" /></button>
		<button :disabled="!canGoDown" class="button button-icon" @click="down"><font-awesome-icon icon="angle-down" /></button>
	</div>
</template>

<script>
export default {
	name: 'ReorderingButtons',
	props: {
		index: Number,
		length: Number
	},
	computed: {
		canGoUp() {
			return this.index > 0;
		},
		canGoDown() {
			return this.index < this.length-1;
		}
	},
	methods: {
		up() {
			this.$emit("reorder", this.index-1);
		},
		down() {
			this.$emit("reorder", this.index+1);
		}
	}
}
</script>

<style lang="css" scoped>
button {
	opacity: 0.5;
	background-color: gray;
	border: solid gray 1px;
	border-radius: 5px;
}
button:hover {
	background-color: darkgrey;
	color: white;
}
button:active {
	background-color: black;
	color: white;
}
button:disabled {
	opacity: 0;
}
</style>