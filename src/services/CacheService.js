class CacheService {
	constructor() {
		this.caches = {};
		this.caches[CACHE_TYPE.APP] = appCache;
		this.caches[CACHE_TYPE.SESSION] = window.sessionStorage;
		this.caches[CACHE_TYPE.LOCAL] = localStorage;
	}

	getCache(type, key) {
		return this.caches[type].getItem(key) || DEFAULT_CACHE[key];
	}

	addToCache(type, key, value) {
		this.caches[type].setItem(key, value);
	}

	removeFromCache(type, key) {
		this.caches[type].remove(key);
	}

	clearCache(type) {
		this.caches[type].clear();
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
	HISTORY_IDENTIFIER: "historyId"
};

const DEFAULT_CACHE = {
	historyId: 0
};

let appCache = {
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