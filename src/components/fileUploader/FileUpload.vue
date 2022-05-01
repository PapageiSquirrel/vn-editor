<template>
	<div style="display: flex; padding-right: 5px;">
		<v-file-input truncate-length="15" type="file" name="fileInput" :id="id" class="input-file" ref="file" @change="onFileChange" />
		<v-btn icon @click="upload">
			<font-awesome-icon icon="file-upload" />
		</v-btn>
		<v-btn icon @click="preview">
			<font-awesome-icon icon="eye" />
		</v-btn>

		<PreviewModal v-if="showPreview" :assetUrl="assetUrl" @close="showPreview = false"></PreviewModal>
	</div>
</template>

<script>
import { fileUploadService } from '../../services/FileUploadService.js'

import PreviewModal from '../modal/PreviewModal.vue'

export default {
	name: 'FileUpload',
	components: {
		PreviewModal
	},
	props: {
		initFileName: String,
		collection: String,
		uploadLabel: String
	},
	data() {
		return {
			id: null,
			file: null,
			fileName: null,
			fileLabel: "",
			showPreview: false,
			isUploaded: false
		}
	},
	computed: {
		fileType() {
			return fileUploadService.getFileTypeByCollection(this.collection)
		},
		assetUrl() {
			return this.fileType + '/' + this.fileName || "";
		}
	},
	methods: {
		upload() {
			let formData = new FormData();
			formData.append('asset', this.file);
			
			return fileUploadService.upload(formData, this.fileName, this.fileType).then((res) => {
				if (res) {
					this.fileName = res;
					this.$emit('upload', {fileUrl: this.fileLabel, fileName: this.fileName});
					this.isUploaded = true;
				}
			});
		},
		preview() {
			if (this.isUploaded) {
				this.showPreview = true;
			}
		},
		onFileChange() {
			this.file = this.$refs.file.files[0];
			this.fileLabel = this.file.name;
		}
	},
	created() {
		this.id = this._uid + "";
		this.fileName = this.initFileName;
		this.isUploaded = !!this.isUploaded;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>