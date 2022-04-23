import { dataService } from '../services/DataService.js'

export default {
	data() {
		return {
			params: null,
			collections: [],
			loadComplete: false,
			loadedDatas: null
		}
	},
	computed: {
		computedDatas() {
			return JSON.parse(JSON.stringify(this.loadedDatas));
		}
	},
	methods: {
		updateDatas(results) {
			this.loadedDatas = results;
			this.loadComplete = true;
		} 
	},
	created() {
		let promises = this.collections.map(col => {
			return dataService.get(col, this.params, false);
		});
		
		return Promise.all(promises)
			.then(this.updateDatas.bind(this));
	}
}