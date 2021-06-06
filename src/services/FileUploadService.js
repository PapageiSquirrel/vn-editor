import axios from 'axios'

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
}

const FILE_TYPE = {
	BACKGROUND: "backgrounds",
	CHARACTER: "characters",
	MUSIC: "musics",
	SOUND: "sounds",
	VOICE: "voices"
};

const fileUploadService = new FileUploadService();
export { fileUploadService, FILE_TYPE };