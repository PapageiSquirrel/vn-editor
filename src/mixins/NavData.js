import { dataService, OPERATION } from '../services/DataService.js'

export default {
	props: {
		collection: String
	},
	data() {
		return {
			loadComplete: false,
			loadedData: null
		}
	},
	methods: {
		add() {
			let item = dataService.create(this.collection);
			if (Array.isArray(this.loadedData)) {
				this.loadedData.push(item);
			} else {
				this.loadedData = item;
			}
		},
		save(data) {
			dataService.set(this.collection, OPERATION.SAVE, data || this.loadedData);
		},
		remove(data) {
			if (!Array.isArray(this.loadedData)) {
				return;
			}
			this.loadedData.splice(this.loadedData.indexOf(data.id), 1);
			dataService.set(this.collection, OPERATION.DELETE, data);
		}
	},
	created() {
		dataService.get(this.collection)
			.then(result => {
				this.loadComplete = true;
				this.loadedData = result 
			});
	}
}