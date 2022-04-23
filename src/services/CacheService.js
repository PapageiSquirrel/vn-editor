import { COLLECTION } from './DataService.js'

class CacheService {
	constructor() {
		this.adapters = {};
		this.adapters[CACHE_TYPE.APP] = appCacheAdapter;
		this.adapters[CACHE_TYPE.SESSION] = window.sessionStorage;
		this.adapters[CACHE_TYPE.LOCAL] = localStorage;
	}

	getCache(type, key) {
		try {
			return JSON.parse(this.adapters[type].getItem(key));
		} catch(e) {
			return DEFAULT_CACHE[key];
		}
		
	}

	getCacheKeyByCollection(collection) {
		switch(collection) {
			case COLLECTION.HISTORIES:
				return CACHE_KEY.HISTORY_IDENTIFIER;
			case COLLECTION.CHARACTERS:
				return CACHE_KEY.STORY_CHARACTERS;
			case COLLECTION.TRAITS:
				return CACHE_KEY.STORY_TRAITS;
			case COLLECTION.TRIGGERS:
				return CACHE_KEY.STORY_TRIGGERS;

		}
	}

	addToCache(type, key, value) {
		this.adapters[type].setItem(key, value);
	}

	addToMultipleCache(types, key, value) {
		types.forEach(t => this.addToCache(t, key, value));
	}

	removeFromCache(type, key) {
		this.adapters[type].removeItem(key);
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
	STORY: "story",
	STORY_CHARACTERS: "storyCharacters",
	STORY_TRAITS: "storyTraits",
	STORY_TRIGGERS: "storyTriggers",
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
	removeItem(key) {
		delete this.__cache[key];
	},
	clear() {
		this.__cache = {};
	}
};

const cacheService = new CacheService();
export { cacheService, CACHE_TYPE, CACHE_KEY };