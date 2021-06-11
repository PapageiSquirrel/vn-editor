let characterId = 0;

export default class Character {
	constructor(name, description, color, moods) {
		this.id = characterId++;
		this.name = name;
		this.description = description;
		this.color = color || "#cc8800";
		this.moods = moods && moods.map(m => new Mood(m.type)) || [];
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
	constructor(type, fileUrl, fileName) {
		this.type = type;
		this.fileUrl = fileUrl;
		this.fileName = fileName;
	}
}