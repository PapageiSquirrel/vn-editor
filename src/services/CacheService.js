class CacheService {
	constructor() {
		this.adapters = {};
		this.adapters[CACHE_TYPE.APP] = appCacheAdapter;
		this.adapters[CACHE_TYPE.SESSION] = window.sessionStorage;
		this.adapters[CACHE_TYPE.LOCAL] = localStorage;
	}

	getCache(type, key) {
		return parseInt(this.adapters[type].getItem(key), 10) || DEFAULT_CACHE[key];
	}

	addToCache(type, key, value) {
		this.adapters[type].setItem(key, value);
	}

	addToMultipleCache(types, key, value) {
		types.forEach(t => this.addToCache(t, key, value));
	}

	removeFromCache(type, key) {
		this.adapters[type].remove(key);
	}

	clearCache(type) {
		this.adapters[type].clear();
	}
}

const CACHE_TYPE = {
	NONE: 0,
	APP: 1,
	SESSION: 2,
	LOCAL: 3,
	EVERY: 4
};

const CACHE_KEY = {
	HISTORY_IDENTIFIER: "historyId",
	STORY_CHARACTERS: "storyCharacters",
	INTERACTION_EDIT: "interactionEdit"
};

const DEFAULT_CACHE = {
	historyId: 1,
	interactionEdit: false
};

let appCacheAdapter = {
	__cache: {},
	getItem(key) {
		return this.__cache[key];
	},
	setItem(key, value) {
		this.__cache[key] = value;
	},
	remove(key) {
		delete this.__cache[key];
	},
	clear() {
		this.__cache = {};
	}
};

const cacheService = new CacheService();
export { cacheService, CACHE_TYPE, CACHE_KEY };