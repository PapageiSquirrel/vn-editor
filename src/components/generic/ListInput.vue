<template>
	<div>
		<ul :aria-label="listTitle">
			<li v-for="(el, index) in elements" :key="el[elKey]">
				<TitleInput :title="el[elKey]" 
							:isClickEdit="false"
							@edit="editElement" 
							@save="saveElement(el, $event)"
							style="width: 100%"></TitleInput>

				<slot :element="el" style="display: block; width: auto;"></slot>

				<button class="button button-icon button-red" @click="deleteElement(index)">
					<font-awesome-icon icon="times" />
				</button>
			</li>

			<li v-show="!isEditing">
				<TitleInput :title="newElement" :placeholder="placeholder" :forceEditMode="true" @save="addElement"></TitleInput>
			</li>
		</ul>
	</div>
</template>

<script>
import TitleInput from './TitleInput.vue'

export default {
	name: 'ListInput',
	components: {
		TitleInput
	},
	props: {
		elements: Array,
		elType: String,
		elKey: String
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
		}
	},
	methods: {
		addElement(value) {
			let newEl = {};
			newEl[this.elKey] = value;
			this.elements.push(newEl);
			this.newElement = "";
		},
		saveElement(el, event) {
			el[this.elKey] = event;
			this.isEditing = false;
		},
		editElement() {
			this.isEditing = true;
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