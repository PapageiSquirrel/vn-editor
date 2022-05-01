<template>
	<v-container>
		<v-row>
			<template v-for="location in locations">
				<v-col :key="location.id">
					<v-card class="pa-2" outlined tile>
						<v-container style="display: flex;">
							<TitleInput :title="location.name" :titleStyle="{ 'font-weight': 'bold', 'font-size': '24px' }" @save="location.name = $event"></TitleInput>
							<v-btn class="button-clear button-icon" @click="remove(location)">
								<font-awesome-icon icon="times" />
							</v-btn>
						</v-container>
						<v-textarea v-model="location.description" rows="1"></v-textarea>
						<ListInput :elements="location.places" :elType="'place'" :elKey="'name'">
							<template v-slot:default="slotProps">
								<FileUpload :initFileName="fileName(char, slotProps)"
									:uploadLabel="'Place asset'"
									@upload="onAssetUpload($event, slotProps)"
									style="width: 60%; margin-left: 5%; margin-right: 5%;" ></FileUpload>
							</template>
						</ListInput>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn @click="remove(location)">
								<font-awesome-icon icon="times" style="margin: 10px;" /> Delete
							</v-btn>
							<v-spacer></v-spacer>
					</v-card-actions>		
					</v-card>
				</v-col>
			</template>
		</v-row>
		
		<Toolbox :nbUndos="modificationHistory.length" @toolAdd="add" @toolUndo="undo" @toolSave="save" @toolUpload="upload"></Toolbox>
	</v-container>
</template>

<script>
import NavData from '../../mixins/NavData'

import TitleInput from '../generic/TitleInput'
import ListInput from '../generic/ListInput'
import Toolbox from '../generic/Toolbox'
import FileUpload from '../fileUploader/FileUpload'

export default {
	name: 'NavLocation',
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
			collection: "locations",
			keepCache: true,
			clearCache: true
		}
	},
	computed: {
		locations() {
			return this.loadedData;
		}
	},
	methods: {
		fileName(char, slotProps) {
			return slotProps.element.backgroundImageUrl || char.name.replace(" ", "_") + "_" + slotProps.element.type;
		},
		onAssetUpload(event, slotProps) {
			slotProps.element.backgroundImageUrl = event.backgroundImageUrl;
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