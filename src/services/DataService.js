import axios from 'axios'

import Tree from '../models/Tree.js'
import Character from '../models/Character.js'
import History from '../models/History.js'

import { cacheService, CACHE_TYPE, CACHE_KEY } from './CacheService.js'

const API_URL = "http://localhost:45050/api/";

class DataService {
	constructor() { 
		this.pendingCalls = {};
		this.adapters = {
			trees: treeAdapter,
			characters: characterAdapter,
			histories: historyAdapter
		}
	}

	_queue(collection, call) {
		this.pendingCalls[collection] = call.finally(() => { this.pendingCalls[collection] = null; });
	}
	
	get(collection, params) {
		if (this.pendingCalls[collection]) {
			return this.pendingCalls[collection];
		}

		let paramsWithId = this.adapters[collection].addIdentifier(params);
		let promise = axios.get(API_URL + collection, paramsWithId)
			.then(result => {
				if (result.status === 200) {
					return this.adapters[collection].convert(result.data);
				}
				return [];
			});

		this._queue(collection, promise);
		return promise;
	}

	set(collection, operation, data) {
		if (this.pendingCalls[collection]) {
			return this.pendingCalls[collection];
		}

		let params = this.adapters[collection].addIdentifier(data);
		let promise = axios.post(API_URL + operation + "/" + collection, params)
			.then(function(result) {
				if (result.status === 200) {
					// TODO: success !
					return true;
				}
				return false;
			});

		this._queue(collection, promise);
		return promise;
	}

	create(collection) {
		return this.adapters[collection].create();
	} 
}

const COLLECTION = {
	TREES: "trees",
	CHARACTERS: "characters",
	HISTORIES: "histories"
};

const OPERATION = {
	ADD: "add",
	UPDATE: "update",
	SAVE: "save",
	DELETE: "delete"
};

const treeAdapter = {
	addIdentifier(data) {
		var dataWithId = data;
		dataWithId.id = cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.HISTORY_IDENTIFIER);
		return dataWithId;
	},
	convert(result) {
		return new Tree(result.trunk, result.name);
	},
	create() {
		return new Tree();
	}
};

const characterAdapter = {
	addIdentifier(data) {
		let historyId = cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.HISTORY_IDENTIFIER);
		return {id: historyId, data: data};
	},
	convert(result) {
		return result.data.map(c => new Character(c.name, c.description));
	},
	create() {
		return new Character("New Character", "description of the character");
	}
};

const historyAdapter = {
	addIdentifier(data) {
		return data;
	},
	convert(result) {
		return result.map(h => new History(h.id, h.name, h.description));
	},
	create() {
		return new History(null, "New Story", "Description of the story");
	}
};

const dataService = new DataService();
export { dataService, COLLECTION, OPERATION };