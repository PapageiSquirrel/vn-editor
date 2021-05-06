import axios from 'axios'

import Tree from '../models/Tree.js'
import Character from '../models/Character.js'
import History from '../models/History.js'
import Trait from '../models/Trait.js'

import { cacheService, CACHE_TYPE, CACHE_KEY } from './CacheService.js'

const API_URL = "http://localhost:45050/api/";

class DataService {
	constructor() { 
		this.pendingCalls = {};
		this.adapters = {
			trees: treeAdapter,
			characters: characterAdapter,
			histories: historyAdapter,
			traits: traitAdapter
		}
	}

	_queue(collection, call) {
		this.pendingCalls[collection] = call.finally(() => { this.pendingCalls[collection] = null; });
	}
	
	get(collection, params, keepCache) {
		if (keepCache) {
			let cache = cacheService.getCache(CACHE_TYPE.APP, CACHE_KEY.STORY_CHARACTERS);
			if (cache) {
				return Promise.resolve(cache);
			}
		}

		if (this.pendingCalls[collection]) {
			return this.pendingCalls[collection];
		}

		let id = this.adapters[collection].getIdentifier(params);
		let promise = axios.get(API_URL + collection + (id ? '?id=' + id : ""))
			.then(result => {
				return result.status === 200 ? this.adapters[collection].convert(result.data) : [];
			})
			.finally(data => {
				if (keepCache) {
					cacheService.addToCache(CACHE_TYPE.APP, CACHE_KEY.STORY_CHARACTERS, data)
				}
			});

		this._queue(collection, promise);
		return promise;
	}

	set(collection, operation, data, clearCache) {
		if (clearCache) {
			cacheService.removeFromCache(CACHE_TYPE.APP, CACHE_KEY.STORY_CHARACTERS);
		}

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
	HISTORIES: "histories",
	TRAITS: "traits"
};

const OPERATION = {
	ADD: "add",
	UPDATE: "update",
	SAVE: "save",
	DELETE: "delete"
};

const treeAdapter = {
	addIdentifier(data) {
		data.id |= cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.HISTORY_IDENTIFIER);
		return data;
	},
	getIdentifier(data) {
		return data && data.id || cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.HISTORY_IDENTIFIER);
	},
	convert(result) {
		return result && new Tree(result.trunk, result.name);
	},
	create() {
		return new Tree();
	}
};

const characterAdapter = {
	addIdentifier(data) {
		let id = this.getIdentifier();
		return {
			id: id,
			data: data
		};
	},
	getIdentifier() {
		return cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.HISTORY_IDENTIFIER);
	},
	convert(result) {
		return result && result.data ? result.data.map(c => new Character(c.name, c.description)) : [];
	},
	create() {
		return new Character("New Character", "description of the character");
	}
};

const historyAdapter = {
	addIdentifier(data) {
		return data;
	},
	getIdentifier(data) {
		return data && data.id;
	},
	convert(result) {
		return result ? result.map(h => new History(h.id, h.name, h.description)) : [];
	},
	create() {
		return new History(null, "New Story", "Description of the story");
	}
};

const traitAdapter = {
	addIdentifier(data) {
		let id = this.getIdentifier();
		return {
			id: id,
			data: data
		};
	},
	getIdentifier() {
		return cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.HISTORY_IDENTIFIER);
	},
	convert(result) {
		return result && result.data ? result.data.map(c => new Trait(c.name, c.steps)) : [];
	},
	create() {
		return new Trait("New Trait");
	}
};

const dataService = new DataService();
export { dataService, COLLECTION, OPERATION };