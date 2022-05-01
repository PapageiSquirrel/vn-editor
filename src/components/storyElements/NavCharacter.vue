<template>
	<v-container>
		<v-row>
			<template v-for="(char, index) in characters">
				<v-col :key="char.id">
					<v-card class="pa-2" outlined tile>
						<v-container style="display: flex;">
							<TitleInput :title="char.name" :titleStyle="{ 'font-weight': 'bold' }" @save="char.name = $event"></TitleInput>
							<v-btn class="button-clear button-icon" @click="remove(char)">
								<font-awesome-icon icon="times" />
							</v-btn>
						</v-container>
						<v-textarea v-model="char.description" rows="1"></v-textarea>
						<ListInput :elements="char.moods" :elType="'mood'" :elKey="'type'">
							<template v-slot:default="slotProps">
								<FileUpload :initFileName="fileName(char, slotProps)"
									:collection="collection"
									:uploadLabel="'Mood asset'"
									@upload="onAssetUpload($event, slotProps)"
									style="width: 60%; margin-left: 5%; margin-right: 5%;" ></FileUpload>
							</template>
						</ListInput>
					</v-card>
				</v-col>

				<v-responsive v-if="index % 2 === 1" :key="`width-${index}`" width="100%"></v-responsive>
			</template>
		</v-row>

		<Toolbox :nbUndos="modificationHistory.length" @toolAdd="add" @toolUndo="undo" @toolSave="save" @toolUpload="upload"></Toolbox>
	</v-container>
</template>

<script>
import NavData from '../../mixins/NavData.js'

import TitleInput from '../generic/TitleInput.vue'
import ListInput from '../generic/ListInput.vue'
import Toolbox from '../generic/Toolbox.vue'
import FileUpload from '../fileUploader/FileUpload.vue'

export default {
	name: 'NavCharacter',
	mixins: [
		NavData
	],
	components: {
		TitleInput,
		ListInput,
		Toolbox,
		FileUpload
	},
	data() {
		return {
			collection: "characters",
			keepCache: true,
			clearCache: true
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