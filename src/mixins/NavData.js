import { dataService, OPERATION } from '../services/DataService.js'

export default {
	props: {
		keepCache: Boolean,
		clearCache: Boolean
	},
	data() {
		return {
			collection: "",
			loadComplete: false,
			loadedData: null,
			modificationHistory: [],
			unwatch: null
		}
	},
	computed: {
		computedData() {
			return JSON.parse(JSON.stringify(this.loadedData));
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
		undo() {
			this.unwatch();
			this.loadedData = this.modificationHistory.pop();
			this.watch();
		},
		save(data) {
			let jsData;
			if (Array.isArray(this.loadedData)) {
				jsData = [...this.loadedData];
			} else {
				jsData = {...this.loadedData};
			}
			dataService.set(this.collection, OPERATION.SAVE, data || jsData, this.clearCache);
		},
		remove(data) {
			if (!Array.isArray(this.loadedData)) {
				return;
			}
			this.loadedData.splice(this.loadedData.indexOf(data.id), 1);
		},
		upload() {
			// TODO
		},
		watch() {
			this.unwatch = this.$watch('computedData', function(newVal, oldVal) {
				this.modificationHistory.push(JSON.parse(JSON.stringify(oldVal)));
			}, {
				deep: true
			});
		}
	},
	created() {
		dataService.get(this.collection, null, this.keepCache)
			.then(result => {
				this.loadedData = result;
				this.loadComplete = true;
			})
			.then(() => {
				this.watch();
			});
	}
}