import axios from 'axios'

import Tree from '../models/Tree'
import Character from '../models/Character'
import History from '../models/History'
import Location from '../models/Location'
import Trait from '../models/Trait'
import Trigger from '../models/Trigger'

import { cacheService, CACHE_TYPE, CACHE_KEY } from './CacheService'

const API_URL = "http://localhost:45050/api/";

class DataService {
	constructor() {
		this.pendingCalls = {};
		this.adapters = {
			trees: treeAdapter,
			characters: characterAdapter,
			histories: historyAdapter,
			locations: locationAdapter,
			traits: traitAdapter,
			triggers: triggerAdapter
		}
	}

	_queue(collection, call) {
		this.pendingCalls[collection] = call.finally(() => { this.pendingCalls[collection] = null; });
	}
	
	get(collection, params, keepCache) {
		if (keepCache) {
			let cacheKey = cacheService.getCacheKeyByCollection(collection);
			let cache = cacheService.getCache(CACHE_TYPE.SESSION, cacheKey);
			if (cache) {
				return Promise.resolve(cache);
			}
		}

		if (this.pendingCalls[collection]) {
			return this.pendingCalls[collection];
		}

		let id = params === PARAMETER.ALL ? null : this.adapters[collection].getIdentifier(params);
		let promise = axios.get(API_URL + collection + (id ? '?id=' + id : ""))
			.then(result => {
				if (result.status !== 200) {
					return [];
				}
				return params !== PARAMETER.ALL ? this.adapters[collection].convert(result.data) : this.adapters[collection].convertAll(result.data);
			})
			.then(data => {
				if (keepCache) {
					let cacheKey = cacheService.getCacheKeyByCollection(collection);
					cacheService.addToCache(CACHE_TYPE.SESSION, cacheKey, data);
				}
				return data;
			});

		this._queue(collection, promise);
		return promise;
	}

	set(collection, operation, data, clearCache) {
		if (this.pendingCalls[collection]) {
			return this.pendingCalls[collection];
		}

		let params = this.adapters[collection].addIdentifier(data);
		let promise = axios.post(API_URL + operation + "/" + collection, params)
			.then(function(result) {
				if (result.status === 200) {
					// TODO: success !
					return result.data;
				}
			})
			.then(data => {
				if (data && clearCache) {
					let cacheKey = cacheService.getCacheKeyByCollection(collection);
					cacheService.addToCache(CACHE_TYPE.SESSION, cacheKey, data);
				}
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
	LOCATIONS: "locations",
	TRAITS: "traits",
	TRIGGERS: "triggers"
};

const OPERATION = {
	ADD: "add",
	UPDATE: "update",
	SAVE: "save",
	DELETE: "delete"
};

const PARAMETER = {
	ALL: "all"
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
		if (Array.isArray(result)) {
			return result.map(r => new Tree(r.id, r.trunk, r.name));
		}
		return result && new Tree(result.id, result.trunk, result.name);
	},
	convertAll() {
		// TODO: implementation for trees is not yet necessary
		return [];
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
		return result && result.data ? result.data.map(c => new Character(c.name, c.description, c.color, c.moods)) : [];
	},
	convertAll(result) {
		return result && result.reduce((res,l) => { 
			res[l.id] = l.data.map(c => new Character(c.name, c.description, c.color, c.moods));
			return res;
		}, {});
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
	convertAll() {
		// TODO: implementation for stories is not yet necessary
		return [];
	},
	create() {
		return new History(null, "New Story", "Description of the story");
	}
};

const locationAdapter = {
	addIdentifier(data) {
		let id = this.getIdentifier();
		return {
			id: id,
			data: data
		};
	},
	getIdentifier() {
		return cacheService.getCache(CACHE_TYPE.SESSION, CACHE_KEY.STORY_LOCATIONS);
	},
	convert(result) {
		return result && result.data ? result.data.map(l => new Location(l.name, l.description, l.places)) : [];
	},
	convertAll(result) {
		return result && result.reduce((res,l) => { 
			res[l.id] = l.data.map(loc => new Location(loc.name, loc.description, loc.places));
			return res;
		}, {});
	},
	create() {
		return new Location("New Location", "Description of the location", []);
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
	convertAll(result) {
		return result && result.reduce((res,l) => { 
			res[l.id] = l.data.map(r => new Trait(r.name, r.steps));
			return res;
		}, {});
	},
	create() {
		return new Trait("New Trait");
	}
};

const triggerAdapter = {
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
		return result && result.data ? result.data.map(c => new Trigger(c.name)) : [];
	},
	convertAll() {
		// TODO: implementation for triggers is not yet necessary
		return [];
	},
	create() {
		return new Trigger("Trigger name");
	}
};

const dataService = new DataService();
export { dataService, COLLECTION, OPERATION, PARAMETER };