import axios from 'axios'

import { COLLECTION } from './DataService'

const FILE_API = "http://localhost:45050/api/file/"

class FileUploadService {
	upload(formData, fileName, fileType) { //, type
		let adaptedFileName = fileName.replace(" ", "_");
		return axios.post(FILE_API + fileType + '/' + adaptedFileName, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(function(result) {
			if (result.status === 200) {
				// TODO: success !
				return result.data.fileName;
			}
			return null;
		});
	}

	getFileTypeByCollection(collection) {
		switch(collection) {
			case COLLECTION.CHARACTERS:
				return FILE_TYPE.CHARACTER;
			case COLLECTION.LOCATIONS:
				return FILE_TYPE.BACKGROUND;
			default:
				return FILE_TYPE.OTHER;
		}
	}
}

const FILE_TYPE = {
	BACKGROUND: "backgrounds",
	CHARACTER: "characters",
	MUSIC: "musics",
	SOUND: "sounds",
	VOICE: "voices",
	OTHER: "others"
};

const fileUploadService = new FileUploadService();
export { fileUploadService, FILE_TYPE };