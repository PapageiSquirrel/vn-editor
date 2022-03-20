<template>
	<div>
		<v-btn icon :disabled="!canGoUp" @click="up"><font-awesome-icon icon="angle-up" /></v-btn>
		<v-btn icon :disabled="!canGoDown" @click="down"><font-awesome-icon icon="angle-down" /></v-btn>
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