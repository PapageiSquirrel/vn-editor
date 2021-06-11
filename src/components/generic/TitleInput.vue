<template>
	<div>
		<div v-show="!isEditMode" width="display:flex;">
			<button class="button-flat button-clear inputDisplay" :style="titleStyle" @click="selectOrEdit" style="width: 90%">{{title}}</button>
			<button v-show="isClickEdit" class="button button-icon button-green" @click="edit">
				<font-awesome-icon icon="edit" /></button>
			<button v-show="isDeletable" class="button button-icon button-red" @click="deleteTitle">
				<font-awesome-icon icon="times" />
			</button>
		</div>
		<div v-show="isEditMode">
			<input ref="editInput" class="inputEdit" type="text" v-model="newTitle" :placeholder="placeholderOrDefault" @keydown="save" @focusout="save" />
		</div>
	</div>
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
.inputDisplay {
	background-color: rgba(var(--font-rgb), 0);
	cursor: pointer;
}
.inputDisplay:hover {
	background-color: rgba(var(--font-rgb), .25);
}
.inputDisplay:active {
	background-color: rgba(var(--font-rgb), .5);
}

.inputEdit {
	background-color: var(--primary-color);
	color: var(--font-color);
}
</style>