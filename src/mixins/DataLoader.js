import { dataService, OPERATION } from '../services/DataService.js'

export default {
	data() {
		return {
			_params: null,
			_collections: [],
			_loadComplete: false,
			_loadedDatas: []
		}
	},
	created() {
		let promises = this._collections.map(col => {
			return dataService.get(col, this._params, true);
		});
		
		return Promise.all(promises).then(results => {
			this._loadedDatas = results;
			this._loadComplete = true;
		});
	}
}