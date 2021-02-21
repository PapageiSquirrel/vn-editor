export default class Character {
	constructor(name, description) {
		this.name = name;
		this.description = description;
		this.moods = [];
	}

	addMood(type, fileUrl) {
		this.moods.push(new Mood(type, fileUrl));
	}

	deleteMood(type) {
		var moodIndex = this.moods.findIndex(mood => mood.type === type);
		this.moods.splice(moodIndex, 1);
	}

	getMoodUrl(type) {
		var mood = this.moods.find(mood => mood.type === type);
		return mood.fileUrl;
	}
}

class Mood {
	constructor(type, fileUrl) {
		this.type = type;
		this.fileUrl = fileUrl;
	}
}