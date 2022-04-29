let locationId = 0;

export default class Location {
	constructor(name, description, places) {
		this.id = locationId++;
		this.name = name;
		this.description = description;
		this.places = places && places.map(p => new Place(p.name, p.backgroundImageUrl)) || [];
	}
}

class Place {
	constructor(name, backgroundImageUrl) {
		this.name = name;
		this.backgroundImageUrl = backgroundImageUrl;
	}
}