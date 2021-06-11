<template>
	<div style="display: flex; padding-right: 5px;">
		<input type="file" name="fileInput" :id="id" class="input-file" ref="file" @change="onFileChange" />
		<label :for="id"><font-awesome-icon icon="file-image" /></label>
		<i style="color: #ccc">{{fileLabel || uploadLabel}}</i>
		<button class="button-icon button-primary" @click="upload">
			<font-awesome-icon icon="file-upload" />
		</button>
		<button class="button-icon button-primary" @click="preview">
			<font-awesome-icon icon="eye" />
		</button>

		<PreviewModal v-if="showPreview" :assetUrl="assetUrl" @close="showPreview = false"></PreviewModal>
	</div>
</template>

<script>
import { fileUploadService, FILE_TYPE } from '../../services/FileUploadService.js'

import PreviewModal from '../modal/PreviewModal.vue'

export default {
	name: 'FileUpload',
	components: {
		PreviewModal
	},
	props: {
		initFileName: String,
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
		assetUrl() {
			return FILE_TYPE.CHARACTER + '/' + this.fileName || "";
		}
	},
	methods: {
		upload() {
			let formData = new FormData();
			formData.append('asset', this.file);
			
			return fileUploadService.upload(formData, this.fileName, FILE_TYPE.CHARACTER).then((res) => {
				if (res) {
					this.fileName = res;
					this.$emit('upload', {fileUrl: this.fileLabel, fileName: this.fileName});
					this.isUploaded = true;
				}
			}); // FILE_TYPE.CHARACTER
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
		this.id = this._uid;
		this.fileName = this.initFileName;
		this.isUploaded = !!this.isUploaded;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.input-file {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

.input-file + label {
    border: 1px solid #345915;
	background-color: #c0e6a1;
	color: #345915;
    display: inline-block;
	padding: 1px 5px;
    cursor: pointer;
}

.input-file:focus + label,
.input-file + label:hover {
    background-color: #345915;
	color: #fff;
}
</style>