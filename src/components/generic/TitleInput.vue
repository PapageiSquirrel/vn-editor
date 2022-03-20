<template>
	<v-container>
		<v-container v-show="!isEditMode">
			<v-btn depressed :style="titleStyle" @click="selectOrEdit">{{title}}</v-btn>
			<v-btn icon v-show="isClickEdit" @click="edit">
				<font-awesome-icon icon="edit" /></v-btn>
			<v-btn icon v-show="isDeletable" @click="deleteTitle">
				<font-awesome-icon icon="times" />
			</v-btn>
		</v-container>
		<v-container v-show="isEditMode">
			<v-text-field outlined ref="editInput" v-model="newTitle" :style="titleStyle" :placeholder="placeholderOrDefault" @keydown="save" @focusout="save" />
		</v-container>
	</v-container>
</template>

<script>
export default {
	name: 'TitleInput',
	props: {
		title: String,
		titleClass: String,
		titleStyle: Object,
		placeholder: String,
		forceEditMode: Boolean,
		isClickEdit: Boolean,
		isDeletable: Boolean,
		isSelectable: Boolean
	},
	data() {
		return {
			editMode: false,
			newTitle: ""
		}
	},
	computed: {
		placeholderOrDefault() {
			return this.placeholder || "none";
		},
		isEditMode() {
			return this.forceEditMode || this.editMode;
		}
	},
	methods: {
		save(e) {
			let defaultKey = 13;
			if (this.forceEditMode && !(e && e.keyCode)) {
				defaultKey = 27;
			}

			var keyCode = e && e.keyCode || defaultKey;
			switch(keyCode) {
				case 27: // esc
					this.$emit("cancel", this.title);
					this.newTitle = "";
					this.editMode = false;
					break;
				case 13: // enter
					if (this.newTitle) this.$emit("save", this.newTitle);
					this.editMode = false;
					break;
			}
		},
		selectOrEdit() {
			if (!this.isClickEdit) {
				this.edit();
				return;
			}
			this.$emit("select");
		},
		deleteTitle() {
			this.$emit("delete");
		},
		edit() {
			this.newTitle = this.title;
			this.editMode = true;
			this.$nextTick(() => {
				this.$refs.editInput.focus();
				this.$emit("edit", this.$refs.editInput);
			});
		}
	}
}
</script>

<style lang="css" scoped>

</style>