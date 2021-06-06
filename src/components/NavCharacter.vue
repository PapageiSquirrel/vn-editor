<template>
	<div style="display: flex;">
		<div style="width: 90%; display: flex; flex-wrap: wrap;">
			<div v-for="char in characters" :key="char.id" class="card-bordered" style="width: 45%;">
				<div style="display: flex;">
					<TitleInput :title="char.name" :titleStyle="{ 'font-weight': 'bold' }" @save="char.name = $event" style="width: 100%"></TitleInput>
					<button class="button-clear button-icon" @click="remove(char)" style="float: right;">
						<font-awesome-icon icon="times" />
					</button>
				</div>
				<textarea v-model="char.description"></textarea>
				<ListInput :elements="char.moods" :elType="'mood'" :elKey="'type'">
					<template v-slot:default="slotProps">
						<FileUpload :initFileName="fileName(char, slotProps)"
							:uploadLabel="'Mood asset'"
							@upload="onAssetUpload($event, slotProps)"
							style="width: 60%; margin-left: 5%; margin-right: 5%;" ></FileUpload>
					</template>
				</ListInput>
			</div>
		</div>
		<ToolboxItem :nbUndos="modificationHistory.length" @toolAdd="add" @toolUndo="undo" @toolSave="save" @toolUpload="upload"></ToolboxItem>
	</div>
</template>

<script>
import NavData from '../mixins/NavData.js'

import TitleInput from './generic/TitleInput.vue'
import ListInput from './generic/ListInput.vue'
import ToolboxItem from './generic/ToolboxItem.vue'
import FileUpload from './fileUploader/FileUpload.vue'

export default {
	name: 'NavCharacter',
	mixins: [
		NavData
	],
	components: {
		TitleInput,
		ListInput,
		ToolboxItem,
		FileUpload
	},
	data() {
		return {
			collection: "characters"
		}
	},
	computed: {
		characters() {
			return this.loadedData;
		}
	},
	methods: {
		fileName(char, slotProps) {
			return slotProps.element.fileUrl || char.name.replace(" ", "_") + "_" + slotProps.element.type;
		},
		onAssetUpload(event, slotProps) {
			slotProps.element.fileUrl = event.fileUrl;
			slotProps.element.fileName = event.fileName;
		}
	},
	destroyed() {
		this.save();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.char-card {
	
}
</style>