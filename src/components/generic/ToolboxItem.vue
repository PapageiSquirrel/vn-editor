<template>
	<div class="toolbox">
		<button class="button button-primary" @click="toolAdd"><font-awesome-icon icon="plus" /></button>
		<button class="button button-primary" :disabled="!nbUndos" @click="toolUndo">{{nbUndos}} <font-awesome-icon icon="history" /></button>
		<button class="button button-primary" @click="toolSave"><font-awesome-icon icon="save" /></button>
		<button class="button button-primary" @click="toolUpload"><font-awesome-icon icon="file-upload" /></button>
	</div>
</template>

<script>
export default {
	name: 'ToolboxItem',
	props: {
		nbUndos: Number
	},
	computed: {
		
	},
	methods: {
		toolAdd() {
			this.$emit("toolAdd");
		},
		toolUndo() {
			this.$emit("toolUndo");
		},
		toolSave() {
			this.$emit("toolSave");
		},
		toolUpload() {
			this.$emit("toolUpload");
		}
	}
}
</script>

<style lang="css" scoped>

</style>