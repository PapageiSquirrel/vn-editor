<template>
	<v-navigation-drawer absolute right permanent v-model="drawer" :mini-variant.sync="mini">
		<v-list-item>
			<v-list-item-icon>
				<font-awesome-icon icon="toolbox" />
			</v-list-item-icon>
			<v-list-item-content v-show="mini">Toolbox</v-list-item-content>
			<v-btn icon @click.stop="mini = !mini">
				<v-icon>mdi-chevron-right</v-icon>
			</v-btn>
		</v-list-item>

		<v-divider></v-divider>

		<v-list-item @click="toolAdd">
			<v-list-item-icon>
				<font-awesome-icon icon="plus" />
			</v-list-item-icon>
			<v-list-item-content>Add Item</v-list-item-content>
		</v-list-item>

		<v-list-item v-if="!isLight"  :disabled="!nbUndos" @click="toolUndo">
			<v-list-item-icon>
				<font-awesome-icon icon="history" />
			</v-list-item-icon>
			<v-list-item-content>Undo ({{nbUndos}})</v-list-item-content>
		</v-list-item>

		<v-list-item @click="toolSave">
			<v-list-item-icon>
				<font-awesome-icon icon="save" />
			</v-list-item-icon>
			<v-list-item-content>Save</v-list-item-content>
		</v-list-item>
		
		<v-list-item v-if="!isLight" @click="toolUpload">
			<v-list-item-icon>
				<font-awesome-icon icon="file-upload" />
			</v-list-item-icon>
			<v-list-item-content>Upload</v-list-item-content>
		</v-list-item>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'Toolbox',
	props: {
		nbUndos: Number,
		isLight: Boolean
	},
	data() {
		return {
			drawer: true,
			mini: false
		}
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