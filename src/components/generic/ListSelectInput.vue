<template>
	<div>
		<ul :aria-label="listTitle">
			<li v-for="(el, index) in elements" :key="el[elKey]">
				<v-select v-model="el[elKey]" :items="itemsList(index)" />

				<slot :element="el" style="display: block; width: auto;"></slot>

				<v-btn icon @click="deleteElement(index)">
					<font-awesome-icon icon="times" />
				</v-btn>
			</li>

			<li v-show="showNewElement">
				<v-select v-model="newElement" :items="itemsList(null)" @change="addElement(newElement)" :placeholder="elLabel" style="margin-left: 5%; margin-right: 5%;" />
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'ListSelectInput',
	props: {
		elements: Array,
		elType: String,
		elKey: String,
		elLabel: String,
		elList: Array,
		isUnique: Boolean
	},
	data: function() {
		return {
			isEditing: false,
			newElement: ""
		}
	},
	computed: {
		placeholder() {
			return "Add a new " + this.elType;
		},
		listTitle() {
			return this.elType.charAt(0).toUpperCase() + this.elType.slice(1) + "s";
		},
		areAllSelected() {
			return this.isUnique ? this.elements.length >= this.elList.length : false;
		},
		showNewElement() {
			return !this.isEditing && !this.areAllSelected
		}
	},
	methods: {
		itemsList(index) {
			if (!this.isUnique) {
				return this.elList;
			}

			let alreadySelectedList = this.elements.map(e => e[this.elKey]);
			if (index != null) {
				alreadySelectedList.splice(index, 1);
			}
			return this.elList.filter(e => !alreadySelectedList.includes(e));
		},
		addElement(value) {
			let newEl = {};
			newEl[this.elKey] = value;
			this.elements.push(newEl);
			this.$nextTick(() => this.newElement = 0);
		},
		deleteElement(index) {
			this.elements.splice(index, 1);
		}
	}
}
</script>

<style lang="css" scoped>
.inputDisplay {
	background-color: rgba(var(--bg-rgb), 0);
	cursor: pointer;
}
.inputDisplay:hover {
	background-color: rgba(var(--bg-rgb), .25);
}
.inputDisplay:active {
	background-color: rgba(var(--bg-rgb), .5);
}

ul {
	border: solid gray 1px;
	padding: 0px;
}

ul:before {
    content:attr(aria-label);
    display: block;
    width: 100%;
    font-size:120%;
    font-weight:bold;
    background-color: var(--primary-color);
    color: var(--font-color);
    text-align: center;
    border-bottom: 2px black solid;
}

li {
	display: flex;
	border-bottom: solid gray 1px;
}
</style>