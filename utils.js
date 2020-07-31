function countColumn(elm) {
	let grid_layout = getComputedStyle(elm).gridTemplateColumns;
	return ((grid_layout.match(/px/g) || []).length);
}

function countRow(elm) {
	let grid_layout = getComputedStyle(elm).gridTemplateRows;
	return ((grid_layout.match(/px/g) || []).length);
}

// return Array(top, left, bottom, right)
function gridAreaToArray(pane) {
	let s = getComputedStyle(pane.elm).gridArea;
	return (s.split(" / ").map(str => parseInt(str, 10)));
}

function intToGridArea(top, left, bottom, right) {
	return (
		top + " / " +
		left + " / " +
		bottom + " / " +
		right
	)
}