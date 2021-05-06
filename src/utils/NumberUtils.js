export default class NumberUtils {
	isNaN(val) {
		return !val && val !== 0;
	}

	returnValue(val) {
		return (!val && val !== 0 ? NaN : val);
	}
}